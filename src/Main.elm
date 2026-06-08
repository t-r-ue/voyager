port module Main exposing (main)

import Browser
import Data exposing (Climate, Destination, HeroSlide, InsiderPick, Review, destinations, heroSlides, insiderPick, reviews)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Process
import Task
import Time


type alias BookingForm =
    { name : String
    , email : String
    , checkin : String
    , checkout : String
    , travelers : String
    , budget : String
    , notes : String
    }


type alias BookingBarForm =
    { destinationId : String
    , checkin : String
    , checkout : String
    , guests : String
    , promo : String
    }


type alias Model =
    { heroIndex : Int
    , activeMood : String
    , searchQuery : String
    , showAutocomplete : Bool
    , selectedDetailDestId : Maybe String
    , activeModalTabImage : Maybe String
    , itinerary : List String
    , isTripPanelOpen : Bool
    , bookingForm : BookingForm
    , bookingBarForm : BookingBarForm
    , inquirySubmittedRef : Maybe String
    , newsletterEmail : String
    , newsletterJoined : Bool
    , mobileNavOpen : Bool
    , navElevated : Bool
    , toast : Maybe String
    , submittingBooking : Bool
    , submittingTripInquiry : Bool
    }


initialModel : Model
initialModel =
    { heroIndex = 0
    , activeMood = "all"
    , searchQuery = ""
    , showAutocomplete = False
    , selectedDetailDestId = Nothing
    , activeModalTabImage = Nothing
    , itinerary = []
    , isTripPanelOpen = False
    , bookingForm =
        { name = ""
        , email = ""
        , checkin = "2026-07-08"
        , checkout = "2026-07-15"
        , travelers = "2"
        , budget = "$3,000 - $6,000"
        , notes = ""
        }
    , bookingBarForm =
        { destinationId = ""
        , checkin = "2026-07-08"
        , checkout = "2026-07-15"
        , guests = "2 Guests"
        , promo = ""
        }
    , inquirySubmittedRef = Nothing
    , newsletterEmail = ""
    , newsletterJoined = False
    , mobileNavOpen = False
    , navElevated = False
    , toast = Nothing
    , submittingBooking = False
    , submittingTripInquiry = False
    }


type Msg
    = NextHeroSlide
    | SetHeroSlide Int
    | ChangeMood String
    | UpdateSearch String
    | HideAutocomplete
    | SelectAutocomplete String
    | TriggerSearch
    | OpenModal String
    | CloseModal
    | SetModalMainImage String
    | AddToTrip String
    | RemoveFromTrip String
    | ClearTrip
    | ToggleTripPanel
    | UpdateBookingFormName String
    | UpdateBookingFormEmail String
    | UpdateBookingFormCheckin String
    | UpdateBookingFormCheckout String
    | UpdateBookingFormTravelers String
    | UpdateBookingFormBudget String
    | UpdateBookingFormNotes String
    | SubmitBookingForm String
    | CompleteBooking String String
    | CloseConfirmModal
    | UpdateBookingBarDestination String
    | UpdateBookingBarCheckin String
    | UpdateBookingBarCheckout String
    | UpdateBookingBarGuests String
    | UpdateBookingBarPromo String
    | SubmitBookingBar
    | UpdateNewsletterEmail String
    | SubmitNewsletter
    | ToggleMobileNav
    | SetNavElevated Bool
    | TriggerToast String
    | HideToast
    | SubmitTripInquiry
    | CompleteTripInquiry String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NextHeroSlide ->
            let
                nextIndex =
                    modBy (List.length heroSlides) (model.heroIndex + 1)
            in
            ( { model | heroIndex = nextIndex }, Cmd.none )

        SetHeroSlide idx ->
            ( { model | heroIndex = idx }, Cmd.none )

        ChangeMood mood ->
            ( { model | activeMood = mood }, Cmd.none )

        UpdateSearch query ->
            ( { model | searchQuery = query, showAutocomplete = String.length query > 0 }, Cmd.none )

        HideAutocomplete ->
            ( { model | showAutocomplete = False }, Cmd.none )

        SelectAutocomplete destId ->
            let
                newModel =
                    { model | searchQuery = "", showAutocomplete = False }
            in
            update (OpenModal destId) newModel

        TriggerSearch ->
            let
                query =
                    String.toLower model.searchQuery

                maybeDest =
                    List.filter
                        (\d ->
                            String.contains query (String.toLower d.name)
                                || String.contains query (String.toLower d.country)
                        )
                        destinations
                        |> List.head
            in
            case maybeDest of
                Just dest ->
                    update (OpenModal dest.id) { model | searchQuery = "", showAutocomplete = False }

                Nothing ->
                    ( { model | searchQuery = "", showAutocomplete = False }
                    , triggerToastCmd "No exact matching destination found. Showing all."
                    )

        OpenModal destId ->
            let
                dest =
                    List.filter (\d -> d.id == destId) destinations |> List.head

                defaultImg =
                    Maybe.map (\d -> List.head d.gallery |> Maybe.withDefault d.image) dest

                currentForm =
                    model.bookingForm

                updatedForm =
                    { currentForm | checkin = model.bookingBarForm.checkin, checkout = model.bookingBarForm.checkout }
            in
            ( { model
                | selectedDetailDestId = Just destId
                , activeModalTabImage = defaultImg
                , bookingForm = updatedForm
                , mobileNavOpen = False
              }
            , Cmd.none
            )

        CloseModal ->
            ( { model | selectedDetailDestId = Nothing, activeModalTabImage = Nothing, submittingBooking = False }, Cmd.none )

        SetModalMainImage img ->
            ( { model | activeModalTabImage = Just img }, Cmd.none )

        AddToTrip destId ->
            if List.member destId model.itinerary then
                ( model, triggerToastCmd "Already in your itinerary!" )

            else
                let
                    updatedItinerary =
                        model.itinerary ++ [ destId ]

                    destName =
                        List.filter (\d -> d.id == destId) destinations
                            |> List.head
                            |> Maybe.map .name
                            |> Maybe.withDefault "Destination"
                in
                ( { model | itinerary = updatedItinerary, isTripPanelOpen = True }
                , triggerToastCmd (destName ++ " added to your trip ✦")
                )

        RemoveFromTrip destId ->
            let
                updatedItinerary =
                    List.filter (\id -> id /= destId) model.itinerary

                panelState =
                    if List.isEmpty updatedItinerary then
                        False

                    else
                        model.isTripPanelOpen
            in
            ( { model | itinerary = updatedItinerary, isTripPanelOpen = panelState }, Cmd.none )

        ClearTrip ->
            ( { model | itinerary = [], isTripPanelOpen = False }, triggerToastCmd "Itinerary cleared" )

        ToggleTripPanel ->
            if List.isEmpty model.itinerary then
                ( model, Cmd.none )

            else
                ( { model | isTripPanelOpen = not model.isTripPanelOpen }, Cmd.none )

        UpdateBookingFormName name ->
            let
                form =
                    model.bookingForm

                updated =
                    { form | name = name }
            in
            ( { model | bookingForm = updated }, Cmd.none )

        UpdateBookingFormEmail email ->
            let
                form =
                    model.bookingForm

                updated =
                    { form | email = email }
            in
            ( { model | bookingForm = updated }, Cmd.none )

        UpdateBookingFormCheckin date ->
            let
                form =
                    model.bookingForm

                updated =
                    { form | checkin = date }
            in
            ( { model | bookingForm = updated }, Cmd.none )

        UpdateBookingFormCheckout date ->
            let
                form =
                    model.bookingForm

                updated =
                    { form | checkout = date }
            in
            ( { model | bookingForm = updated }, Cmd.none )

        UpdateBookingFormTravelers count ->
            let
                form =
                    model.bookingForm

                updated =
                    { form | travelers = count }
            in
            ( { model | bookingForm = updated }, Cmd.none )

        UpdateBookingFormBudget budget ->
            let
                form =
                    model.bookingForm

                updated =
                    { form | budget = budget }
            in
            ( { model | bookingForm = updated }, Cmd.none )

        UpdateBookingFormNotes notes ->
            let
                form =
                    model.bookingForm

                updated =
                    { form | notes = notes }
            in
            ( { model | bookingForm = updated }, Cmd.none )

        SubmitBookingForm destId ->
            if String.isEmpty model.bookingForm.name || String.isEmpty model.bookingForm.email then
                ( model, triggerToastCmd "Please fill in your name and email." )

            else if model.bookingForm.checkin >= model.bookingForm.checkout then
                ( model, triggerToastCmd "Departure date must be after arrival date." )

            else
                ( { model | submittingBooking = True }
                , Process.sleep 1500
                    |> Task.perform (\_ -> CompleteBooking destId model.bookingForm.name)
                )

        CompleteBooking destId name ->
            let
                refNum =
                    if destId == "itinerary" then
                        "VYG-T" ++ String.slice 0 5 (String.toUpper name)

                    else
                        "VYG-B" ++ String.slice 0 5 (String.toUpper name)
            in
            ( { model
                | submittingBooking = False
                , selectedDetailDestId = Nothing
                , inquirySubmittedRef = Just refNum
                , itinerary =
                    if destId == "itinerary" then
                        []

                    else
                        model.itinerary
                , isTripPanelOpen =
                    if destId == "itinerary" then
                        False

                    else
                        model.isTripPanelOpen
              }
            , Cmd.none
            )

        CloseConfirmModal ->
            ( { model | inquirySubmittedRef = Nothing }, Cmd.none )

        UpdateBookingBarDestination destId ->
            let
                bar =
                    model.bookingBarForm

                updated =
                    { bar | destinationId = destId }
            in
            ( { model | bookingBarForm = updated }, Cmd.none )

        UpdateBookingBarCheckin date ->
            let
                bar =
                    model.bookingBarForm

                updated =
                    { bar | checkin = date }
            in
            ( { model | bookingBarForm = updated }, Cmd.none )

        UpdateBookingBarCheckout date ->
            let
                bar =
                    model.bookingBarForm

                updated =
                    { bar | checkout = date }
            in
            ( { model | bookingBarForm = updated }, Cmd.none )

        UpdateBookingBarGuests count ->
            let
                bar =
                    model.bookingBarForm

                updated =
                    { bar | guests = count }
            in
            ( { model | bookingBarForm = updated }, Cmd.none )

        UpdateBookingBarPromo code ->
            let
                bar =
                    model.bookingBarForm

                updated =
                    { bar | promo = code }
            in
            ( { model | bookingBarForm = updated }, Cmd.none )

        SubmitBookingBar ->
            if String.isEmpty model.bookingBarForm.destinationId then
                ( model, triggerToastCmd "Please select a destination." )

            else if model.bookingBarForm.checkin >= model.bookingBarForm.checkout then
                ( model, triggerToastCmd "Departure date must be after arrival date." )

            else
                update (OpenModal model.bookingBarForm.destinationId) model

        UpdateNewsletterEmail email ->
            ( { model | newsletterEmail = email }, Cmd.none )

        SubmitNewsletter ->
            ( { model | newsletterJoined = True, newsletterEmail = "" }, triggerToastCmd "Welcome to Voyager access list." )

        ToggleMobileNav ->
            ( { model | mobileNavOpen = not model.mobileNavOpen }, Cmd.none )

        SetNavElevated val ->
            ( { model | navElevated = val }, Cmd.none )

        TriggerToast msgStr ->
            ( { model | toast = Just msgStr }, Cmd.none )

        HideToast ->
            ( { model | toast = Nothing }, Cmd.none )

        SubmitTripInquiry ->
            ( { model | submittingTripInquiry = True }
            , Process.sleep 1500
                |> Task.perform (\_ -> CompleteTripInquiry "Itinerary")
            )

        CompleteTripInquiry name ->
            let
                refNum =
                    "VYG-T" ++ String.slice 0 5 (String.toUpper name)
            in
            ( { model
                | submittingTripInquiry = False
                , itinerary = []
                , isTripPanelOpen = False
                , inquirySubmittedRef = Just refNum
              }
            , Cmd.none
            )


triggerToastCmd : String -> Cmd Msg
triggerToastCmd msgStr =
    Task.perform (\_ -> TriggerToast msgStr) (Task.succeed ())


port navScroll : (Bool -> msg) -> Sub msg


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Time.every 6000 (\_ -> NextHeroSlide)
        , Time.every 3000 (\_ -> HideToast)
        , navScroll SetNavElevated
        ]



-- ============================================================
-- VIEW GENERATION
-- ============================================================


view : Model -> Html Msg
view model =
    div [ class "app-root" ]
        [ renderHeader model
        , renderMobileNav model
        , renderHero model
        , renderBookingBar model
        , renderIntro model
        , renderSplitSections model
        , renderDiscover model
        , renderFeaturedMosaic model
        , renderExperiences model
        , renderInsiderPickSection model
        , renderProcess model
        , renderStories model
        , renderJoinCTA model
        , renderFooter model
        , renderModal model
        , renderTripPanel model
        , renderConfirmModal model
        , renderToast model
        ]


renderHeader : Model -> Html Msg
renderHeader model =
    nav [ id "nav", class (if model.navElevated then "elevated" else "") ]
        [ div [ class "nav-inner" ]
            [ ul [ class "nav-links", role "list" ]
                [ li [] [ a [ href "#discover" ] [ text "Destinations" ] ]
                , li [] [ a [ href "#experiences" ] [ text "Experiences" ] ]
                , li [] [ a [ href "#insider" ] [ text "Insider's Pick" ] ]
                , li [] [ a [ href "#stories" ] [ text "Stories" ] ]
                ]
            , a [ class "nav-logo", href "#" ]
                [ text "Voyager"
                , span [ class "nav-logo-sub" ] [ text "Travel" ]
                ]
            , div [ class "nav-actions" ]
                [ a [ href "#process", class "nav-links" ] [ text "How It Works" ]
                , button [ class "nav-book-btn", id "nav-book-btn", onClick (OpenModal "santorini") ] [ text "Book Now" ]
                ]
            , button
                [ class ("nav-hamburger" ++ (if model.mobileNavOpen then " active" else ""))
                , id "nav-hamburger"
                , onClick ToggleMobileNav
                ]
                [ span [] []
                , span [] []
                , span [] []
                ]
            ]
        ]


renderMobileNav : Model -> Html Msg
renderMobileNav model =
    div [ id "mobile-nav", class (if model.mobileNavOpen then "open" else "") ]
        [ a [ href "#discover", class "mobile-nav-link", onClick ToggleMobileNav ] [ text "Destinations" ]
        , a [ href "#experiences", class "mobile-nav-link", onClick ToggleMobileNav ] [ text "Experiences" ]
        , a [ href "#insider", class "mobile-nav-link", onClick ToggleMobileNav ] [ text "Insider's Pick" ]
        , a [ href "#stories", class "mobile-nav-link", onClick ToggleMobileNav ] [ text "Stories" ]
        , a [ href "#process", class "mobile-nav-link", onClick ToggleMobileNav ] [ text "How It Works" ]
        , a [ href "#", class "mobile-nav-link", style "color" "var(--gold)", onClick (OpenModal "santorini") ] [ text "Book Now" ]
        ]


renderHero : Model -> Html Msg
renderHero model =
    let
        activeSlide =
            List.drop model.heroIndex heroSlides
                |> List.head
                |> Maybe.withDefault { image = "", label = "" }

        renderDots i =
            div
                [ class ("hero-dot" ++ (if model.heroIndex == i then " active" else ""))
                , onClick (SetHeroSlide i)
                ]
                []
    in
    section [ id "hero", ariaLabel "Voyager - Curated Travel Experiences" ]
        [ div [ class "hero-slides", id "hero-slides" ]
            (List.indexedMap
                (\i slide ->
                    div
                        [ class ("hero-slide" ++ (if model.heroIndex == i then " active" else ""))
                        , style "background-image" ("url('" ++ slide.image ++ "')")
                        ]
                        []
                )
                heroSlides
            )
        , div [ class "hero-overlay" ] []
        , div [ class "hero-content" ]
            [ h1 [ class "hero-tagline", id "hero-title" ]
                [ text "Indulge in an"
                , br [] []
                , text "Elegant Escape"
                ]
            , div [ class "hero-divider" ] []
            , p [ class "hero-sub" ] [ text "Curated journeys | Expert planning | Unmatched access" ]
            ]
        , div [ class "hero-location" ]
            [ div [ class "hero-location-dot" ] []
            , span [ class "hero-location-text", id "slide-label" ] [ text activeSlide.label ]
            ]
        , div [ class "hero-dots", id "slide-dots" ]
            (List.range 0 (List.length heroSlides - 1) |> List.map renderDots)
        ]


renderBookingBar : Model -> Html Msg
renderBookingBar model =
    let
        destinationOptions dest =
            option [ value dest.id ] [ text (dest.name ++ ", " ++ dest.country) ]
    in
    div [ id "booking-bar", role "search", ariaLabel "Book your journey" ]
        [ div [ class "booking-bar-inner" ]
            [ div [ class "bb-field" ]
                [ div [ class "bb-label" ] [ text "Destination" ]
                , select
                    [ class "bb-select"
                    , id "bb-destination"
                    , value model.bookingBarForm.destinationId
                    , onInput UpdateBookingBarDestination
                    ]
                    (option [ value "" ] [ text "All Destinations" ]
                        :: List.map destinationOptions destinations
                    )
                ]
            , div [ class "bb-field" ]
                [ div [ class "bb-label" ] [ text "Check In / Check Out" ]
                , div [ style "display" "flex", style "align-items" "center", style "gap" "8px" ]
                    [ input
                        [ type_ "date"
                        , class "bb-input"
                        , id "bb-checkin"
                        , value model.bookingBarForm.checkin
                        , onInput UpdateBookingBarCheckin
                        ]
                        []
                    , span [ style "color" "var(--ink-muted)", style "font-size" "0.75rem" ] [ text "-" ]
                    , input
                        [ type_ "date"
                        , class "bb-input"
                        , id "bb-checkout"
                        , value model.bookingBarForm.checkout
                        , onInput UpdateBookingBarCheckout
                        ]
                        []
                    ]
                ]
            , div [ class "bb-field", style "max-width" "150px" ]
                [ div [ class "bb-label" ] [ text "Guests" ]
                , select
                    [ class "bb-select"
                    , id "bb-guests"
                    , value model.bookingBarForm.guests
                    , onInput UpdateBookingBarGuests
                    ]
                    [ option [] [ text "1 Guest" ]
                    , option [] [ text "2 Guests" ]
                    , option [] [ text "3 Guests" ]
                    , option [] [ text "4 Guests" ]
                    , option [] [ text "5+ Guests" ]
                    ]
                ]
            , button [ class "bb-cta", id "bb-search-btn", onClick SubmitBookingBar ]
                [ text "Check Availability"
                , span [ class "bb-cta-sub" ] [ text "Best Rate Guarantee" ]
                ]
            , div [ class "bb-suites" ]
                [ span [ class "bb-suites-text" ]
                    [ text "Suites +"
                    , br [] []
                    , text "Flight Packages"
                    ]
                ]
            ]
        ]


renderIntro : Model -> Html Msg
renderIntro model =
    section [ id "intro", ariaLabel "About Voyager" ]
        [ div [ class "container" ]
            [ Html.node "svg"
                [ class "intro-icon reveal visible"
                , attribute "viewBox" "0 0 44 44"
                , attribute "fill" "none"
                ]
                [ Html.node "path"
                    [ attribute "d" "M22 2L26.5 14.5L40 14.5L29 22.5L33 35L22 27L11 35L15 22.5L4 14.5L17.5 14.5Z"
                    , attribute "stroke" "#B5935A"
                    , attribute "stroke-width" "1"
                    , attribute "fill" "none"
                    ]
                    []
                ]
            , p [ class "intro-heading reveal visible" ]
                [ text "Infinite Excellence,"
                , br [] []
                , text "For Those Who Seek It"
                ]
            , div [ class "intro-body stagger-children visible" ]
                [ p []
                    [ text "Immerse yourself in destinations that transcend the ordinary -- where dazzling natural scenery meets the refined pleasures of world-class hospitality. Created for travelers who understand that the finest journeys are felt, not merely taken."
                    ]
                , p []
                    [ text "From refreshing overwater villas and enchanting cliffside estates to the vibrant energy of legendary cities, Voyager positions you at the heart of experiences most travelers only dream of. Every detail is handled. Every moment is yours."
                    ]
                ]
            ]
        ]


renderSplitSections : Model -> Html Msg
renderSplitSections model =
    div []
        [ section [ ariaLabel "Tropical escapes", class "reveal visible" ]
            [ div [ class "split-section" ]
                [ div [ class "split-img-col" ]
                    [ img
                        [ class "split-img"
                        , src "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=85"
                        , alt "Maldives overwater villa at sunset"
                        ]
                        []
                    ]
                , div [ class "split-text-col cream" ]
                    [ span [ class "heading-label" ] [ text "Destination" ]
                    , h2 [ class "heading-xl" ]
                        [ text "Fly Away to"
                        , br [] []
                        , text "a Tropical Oasis"
                        ]
                    , p [ class "body-copy" ]
                        [ text "Arrive into a world of possibilities, indulgence, and unmatched luxury in the spectacular destinations where Voyager has crafted its properties for an extraordinary experience. Where turquoise waters meet white sand -- and time slows to a breath."
                        ]
                    , a [ href "#discover", class "cta-link" ]
                        [ text "Discover Our Destinations"
                        , Html.node "svg"
                            [ attribute "viewBox" "0 0 24 24"
                            , attribute "stroke-width" "1.5"
                            , attribute "stroke-linecap" "round"
                            , attribute "stroke-linejoin" "round"
                            ]
                            [ Html.node "line" [ attribute "x1" "5", attribute "y1" "12", attribute "x2" "19", attribute "y2" "12" ] []
                            , Html.node "polyline" [ attribute "points" "12,5 19,12 12,19" ] []
                            ]
                        ]
                    , div [ class "split-price" ]
                        [ span [ class "split-price-from" ] [ text "From" ]
                        , span [ class "split-price-amount" ] [ text "$1,890" ]
                        , span [ class "split-price-note" ] [ text "/ person" ]
                        ]
                    ]
                ]
            ]
        , section [ ariaLabel "Romantic experiences", class "reveal visible" ]
            [ div [ class "split-section reverse" ]
                [ div [ class "split-img-col" ]
                    [ img
                        [ class "split-img"
                        , src "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=85"
                        , alt "Amalfi Coast cliffside at golden hour"
                        ]
                        []
                    ]
                , div [ class "split-text-col navy" ]
                    [ span [ class "heading-label", style "color" "rgba(255,255,255,0.4)" ] [ text "Romance" ]
                    , h2 [ class "heading-xl", style "color" "var(--gold-light)" ]
                        [ text "Rekindle Your"
                        , br [] []
                        , text "Spirit at Golden Hour"
                        ]
                    , p [ class "body-copy", style "color" "rgba(255,255,255,0.58)" ]
                        [ text "Escape to the romantic backdrop of our tailored itineraries and rekindle your spirit among breathtaking sunsets, extensive culinary excellence, and the quiet luxury of places that know how to slow time down."
                        ]
                    , a [ href "#discover", class "cta-link", style "color" "var(--gold-light)" ]
                        [ text "Explore Romance Journeys"
                        , Html.node "svg"
                            [ attribute "viewBox" "0 0 24 24"
                            , attribute "stroke-width" "1.5"
                            , attribute "stroke-linecap" "round"
                            , attribute "stroke-linejoin" "round"
                            ]
                            [ Html.node "line" [ attribute "x1" "5", attribute "y1" "12", attribute "x2" "19", attribute "y2" "12" ] []
                            , Html.node "polyline" [ attribute "points" "12,5 19,12 12,19" ] []
                            ]
                        ]
                    ]
                ]
            ]
        ]


renderDiscover : Model -> Html Msg
renderDiscover model =
    let
        filteredDests =
            if model.activeMood == "all" then
                destinations

            else
                List.filter (\d -> List.member model.activeMood d.moods) destinations

        moodPillButton mood label =
            button
                [ class ("mood-pill" ++ (if model.activeMood == mood then " active" else ""))
                , onClick (ChangeMood mood)
                ]
                [ text label ]
    in
    section [ id "discover", ariaLabel "Discover destinations by mood" ]
        [ div [ class "container" ]
            [ div [ class "discover-header" ]
                [ div []
                    [ span [ class "label", style "color" "rgba(255,255,255,0.35)", style "margin-bottom" "10px" ] [ text "Explore the World" ]
                    , h2 [ class "heading-xl" ] [ text "Our Destinations" ]
                    ]
                ]
            , div [ class "mood-pills stagger-children visible", id "mood-pills", role "toolbar", ariaLabel "Filter by mood" ]
                [ moodPillButton "all" "All"
                , moodPillButton "escape" "Escape"
                , moodPillButton "adventure" "Adventure"
                , moodPillButton "romance" "Romance"
                , moodPillButton "culture" "Culture"
                , moodPillButton "reset" "Reset"
                ]
            , div [ class "destination-grid", id "destination-grid", role "list", ariaLabel "Destinations" ]
                (List.map (renderDestCard model) filteredDests)
            ]
        ]


renderDestCard : Model -> Destination -> Html Msg
renderDestCard model dest =
    let
        starCount =
            floor dest.rating

        starStr =
            String.repeat starCount "★"

        inItinerary =
            List.member dest.id model.itinerary
    in
    article
        [ class "dest-card"
        , attribute "role" "listitem"
        , tabindex 0
        , ariaLabel (dest.name ++ ", " ++ dest.country)
        ]
        [ div [ class "dest-card-img-wrap" ]
            [ img [ class "dest-card-img", src dest.image, alt (dest.name ++ ", " ++ dest.country) ] []
            , div [ class "dest-card-overlay" ] []
            , button
                [ class ("dest-card-add-btn" ++ (if inItinerary then " added" else ""))
                , onClick (AddToTrip dest.id)
                , title (if inItinerary then "Added to trip" else "Add to trip")
                ]
                [ text (if inItinerary then "~" else "+") ]
            , div [ class "dest-card-info" ]
                [ div [ class "dest-card-meta" ]
                    [ div [ class "dest-card-rating" ]
                        [ span [ class "dest-card-rating-star" ] [ text starStr ]
                        , span [] [ text (String.fromFloat dest.rating) ]
                        ]
                    , div [ class "dest-card-price" ]
                        [ text ("$" ++ String.fromInt dest.price)
                        , span [] [ text " / person" ]
                        ]
                    ]
                ]
            ]
        , div [ class "dest-card-body" ]
            [ div [ class "dest-card-region" ] [ text dest.region ]
            , h3 [ class "dest-card-name" ] [ text dest.name ]
            , p [ class "dest-card-country" ] [ text dest.country ]
            , button [ class "dest-card-view-btn", onClick (OpenModal dest.id) ]
                [ text "Explore"
                , Html.node "svg"
                    [ attribute "width" "12"
                    , attribute "height" "12"
                    , attribute "viewBox" "0 0 24 24"
                    , attribute "fill" "none"
                    , attribute "stroke" "currentColor"
                    , attribute "stroke-width" "2.5"
                    ]
                    [ Html.node "line" [ attribute "x1" "5", attribute "y1" "12", attribute "x2" "19", attribute "y2" "12" ] []
                    , Html.node "polyline" [ attribute "points" "12,5 19,12 12,19" ] []
                    ]
                ]
            ]
        ]


renderFeaturedMosaic : Model -> Html Msg
renderFeaturedMosaic model =
    let
        featured =
            List.take 5 destinations

        renderTile dest =
            div
                [ class "dest-tile"
                , attribute "role" "listitem"
                , onClick (OpenModal dest.id)
                ]
                [ div [ class "dest-tile-img-wrap" ]
                    [ img [ class "dest-tile-img", src (dest.heroImage), alt dest.name ] []
                    ]
                , div [ class "dest-tile-overlay" ] []
                , div [ class "dest-tile-info" ]
                    [ span [ class "dest-tile-label" ] [ text dest.region ]
                    , h3 [ class "dest-tile-name" ] [ text (dest.name ++ ", " ++ dest.country) ]
                    , div [ class "dest-tile-price" ] [ text ("from $" ++ String.fromInt dest.price ++ " / person") ]
                    ]
                , button [ class "dest-tile-btn", ariaLabel ("View " ++ dest.name) ] [ text "View Details" ]
                ]
    in
    section [ id "destinations", ariaLabel "Featured destinations" ]
        [ div [ style "padding" "var(--gap) 0", style "background" "var(--cream-mid)" ]
            [ div [ class "container" ]
                [ span [ class "label reveal visible", style "margin-bottom" "10px" ] [ text "Featured" ]
                , h2 [ class "heading-xl heading-dark reveal visible", style "color" "var(--gold)" ]
                    [ text "Discover Our"
                    , br [] []
                    , text "Destinations"
                    ]
                ]
            , div [ class "dest-mosaic", id "dest-mosaic", style "margin-top" "44px" ]
                (List.map renderTile featured)
            ]
        ]


renderExperiences : Model -> Html Msg
renderExperiences model =
    section [ id "experiences", ariaLabel "Curated experiences" ]
        [ div [ style "padding" "var(--gap) 0", style "background" "var(--white)" ]
            [ div [ class "container" ]
                [ span [ class "label reveal visible", style "margin-bottom" "10px" ] [ text "Excellence Experiences" ]
                , h2 [ class "heading-xl heading-dark reveal visible", style "color" "var(--gold)" ]
                    [ text "Voyager for"
                    , br [] []
                    , text "Adults Only"
                    ]
                ]
            , div [ class "exp-grid container", style "margin-top" "44px" ]
                [ div [ class "exp-main reveal-left visible" ]
                    [ img
                        [ class "exp-main-img"
                        , src "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85"
                        , alt "Bali luxury villa with rice terraces"
                        ]
                        []
                    , div [ class "exp-main-label" ] [ text "Bali, Indonesia" ]
                    ]
                , div [ class "exp-sidebar stagger-children visible" ]
                    [ div [ class "exp-card" ]
                        [ span [ class "exp-card-num" ] [ text "I" ]
                        , h3 [ class "exp-card-title" ] [ text "Swim-Up Suites" ]
                        , p [ class "exp-card-text" ] [ text "Step from your private suite directly into turquoise water. No crowds, no compromise - just uninterrupted luxury at the water's edge." ]
                        ]
                    , div [ class "exp-card" ]
                        [ span [ class "exp-card-num" ] [ text "II" ]
                        , h3 [ class "exp-card-title" ] [ text "Rooftop Terrace Dining" ]
                        , p [ class "exp-card-text" ] [ text "From sunset cocktails to multi-course tasting menus, our culinary experiences are as unforgettable as the views they're served against." ]
                        ]
                    , div [ class "exp-card" ]
                        [ span [ class "exp-card-num" ] [ text "III" ]
                        , h3 [ class "exp-card-title" ] [ text "Private Beach Access" ]
                        , p [ class "exp-card-text" ] [ text "Secluded stretches of coastline, reserved exclusively for our guests. The definition of having the world to yourself." ]
                        ]
                    ]
                ]
            ]
        ]


renderInsiderPickSection : Model -> Html Msg
renderInsiderPickSection model =
    section [ id "insider", ariaLabel "Insider's Pick - Featured Destination" ]
        [ div [ class "container" ]
            [ span [ class "label reveal visible", style "margin-bottom" "12px" ] [ text "Insider's Pick" ]
            , div [ class "insider-inner reveal-scale visible" ]
                [ div [ class "insider-image-col" ]
                    [ img [ id "insider-img", class "insider-img", src insiderPick.image, alt insiderPick.destination ] []
                    , div [ class "insider-image-label", id "insider-month-label" ] [ text insiderPick.month ]
                    ]
                , div [ class "insider-text-col" ]
                    [ span [ class "insider-eyebrow label", id "insider-eyebrow" ] [ text insiderPick.destination ]
                    , h2 [ class "insider-title", id "insider-title" ] [ text "The coast the\ncrowds don't know" ]
                    , blockquote [ class "insider-quote", id "insider-quote" ]
                        [ text ("\"" ++ insiderPick.pullQuote ++ "\"") ]
                    , p [ class "insider-body", id "insider-body" ]
                        [ text insiderPick.body ]
                    , div [ class "insider-footer" ]
                        [ div []
                            [ p [ class "insider-price-label" ] [ text "From" ]
                            , p [ class "insider-price", id "insider-price" ]
                                [ text ("$" ++ String.fromInt insiderPick.price)
                                , span [] [ text " / person" ]
                                ]
                            ]
                        , button
                            [ class "btn-primary"
                            , id "insider-book-btn"
                            , onClick (OpenModal insiderPick.destinationId)
                            , ariaLabel ("Book " ++ insiderPick.destination ++ " Insider's Pick")
                            ]
                            [ text "Book This Journey "
                            , Html.node "svg"
                                [ attribute "width" "14"
                                , attribute "height" "14"
                                , attribute "viewBox" "0 0 24 24"
                                , attribute "fill" "none"
                                , attribute "stroke" "currentColor"
                                , attribute "stroke-width" "2"
                                ]
                                [ Html.node "line" [ attribute "x1" "5", attribute "y1" "12", attribute "x2" "19", attribute "y2" "12" ] []
                                , Html.node "polyline" [ attribute "points" "12,5 19,12 12,19" ] []
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ]


renderProcess : Model -> Html Msg
renderProcess model =
    section [ id "process", ariaLabel "How Voyager works" ]
        [ div [ class "container" ]
            [ span [ class "label reveal visible", style "margin-bottom" "12px" ] [ text "The Process" ]
            , h2 [ class "heading-xl heading-dark reveal visible", style "color" "var(--gold)" ] [ text "How It Works" ]
            , div [ class "process-inner stagger-children visible", role "list" ]
                [ div [ class "process-step", role "listitem" ]
                    [ p [ class "process-num" ] [ text "I" ]
                    , h3 [ class "process-title" ] [ text "Tell us who you are" ]
                    , p [ class "process-text" ] [ text "Not where you want to go -- who you want to be when you get there. Our conversation covers mood, budget, travel style, and the details most agencies never ask." ]
                    ]
                , div [ class "process-step", role "listitem" ]
                    [ p [ class "process-num" ] [ text "II" ]
                    , h3 [ class "process-title" ] [ text "We build your journey" ]
                    , p [ class "process-text" ] [ text "A dedicated travel curator designs every element -- accommodation, timing, private experiences, and contingencies. You review, refine, approve. No templates." ]
                    ]
                , div [ class "process-step", role "listitem" ]
                    [ p [ class "process-num" ] [ text "III" ]
                    , h3 [ class "process-title" ] [ text "Arrive, be present" ]
                    , p [ class "process-text" ] [ text "Everything is handled. Your concierge is available 24/7 during your trip. All you need to do is pay attention to what's in front of you." ]
                    ]
                ]
            ]
        ]


renderStories : Model -> Html Msg
renderStories model =
    let
        renderReview story =
            div [ class "story-card reveal visible", role "listitem" ]
                [ div [ class "story-img-wrap" ]
                    [ img [ class "story-img", src story.tripImage, alt story.destination ] []
                    ]
                , div [ class "story-content" ]
                    [ span [ class "story-dest label" ] [ text story.destination ]
                    , p [ class "story-text" ] [ text story.text ]
                    , div [ class "story-author" ]
                        [ img [ class "story-avatar", src story.avatar, alt story.name ] []
                        , div []
                            [ p [ class "story-name" ] [ text story.name ]
                            , p [ class "story-location" ] [ text story.location ]
                            ]
                        ]
                    ]
                ]
    in
    section [ id "stories", ariaLabel "Traveler stories" ]
        [ div [ class "container" ]
            [ span [ class "label reveal visible", style "margin-bottom" "12px" ] [ text "Real Travelers" ]
            , h2 [ class "heading-xl heading-dark reveal visible", style "color" "var(--gold)" ]
                [ text "Not Reviews."
                , br [] []
                , text "Stories."
                ]
            , p [ class "body-copy reveal visible", style "margin-top" "14px", style "max-width" "440px" ]
                [ text "Every testimonial comes with the photo taken on the trip we planned." ]
            , div [ class "stories-grid stagger-children visible", id "stories-grid", role "list", ariaLabel "Traveler reviews" ]
                (List.map renderReview reviews)
            ]
        ]


renderJoinCTA : Model -> Html Msg
renderJoinCTA model =
    section [ id "join-cta", ariaLabel "Join Voyager newsletter" ]
        [ Html.node "svg"
            [ class "join-icon"
            , attribute "viewBox" "0 0 44 44"
            , attribute "fill" "none"
            ]
            [ Html.node "path"
                [ attribute "d" "M22 2L26.5 14.5L40 14.5L29 22.5L33 35L22 27L11 35L15 22.5L4 14.5L17.5 14.5Z"
                , attribute "stroke" "#C9A96E"
                , attribute "stroke-width" "1"
                , attribute "fill" "none"
                ]
                []
            ]
        , h2 [ class "join-heading reveal visible" ] [ text "Unlock Exclusive Access" ]
        , p [ class "join-sub reveal visible" ] [ text "Early access to new destinations, members-only offers, and the insider intelligence that changes how you travel." ]
        , if model.newsletterJoined then
            p [ style "color" "var(--gold)", style "margin-top" "12px" ] [ text "Thank you for joining. Welcome to Voyager." ]

          else
            Html.form [ class "join-form reveal visible", id "newsletter-form", onSubmit SubmitNewsletter, ariaLabel "Newsletter signup" ]
                [ input
                    [ type_ "email"
                    , id "newsletter-email"
                    , placeholder "Your email address"
                    , value model.newsletterEmail
                    , onInput UpdateNewsletterEmail
                    , required True
                    ]
                    []
                , button [ type_ "submit", ariaLabel "Subscribe" ] [ text "Join Now" ]
                ]
        ]


renderFooter : Model -> Html Msg
renderFooter model =
    footer [ role "contentinfo" ]
        [ div [ class "container" ]
            [ div [ class "footer-top" ]
                [ div []
                    [ div [ class "footer-logo" ]
                        [ text "Voyager"
                        , span [ class "footer-logo-sub" ] [ text "Curated Travel" ]
                        ]
                    , p [ class "footer-tagline" ]
                        [ text "Extraordinary journeys for those who travel to feel something, not just to go somewhere. Expert curation. Unmatched access. Every detail handled." ]
                    ]
                , div []
                    [ h3 [ class "footer-col-title" ] [ text "Destinations" ]
                    , ul [ class "footer-links", role "list" ]
                        [ li [] [ a [ href "#discover" ] [ text "Europe" ] ]
                        , li [] [ a [ href "#discover" ] [ text "Southeast Asia" ] ]
                        , li [] [ a [ href "#discover" ] [ text "Africa & Safari" ] ]
                        , li [] [ a [ href "#discover" ] [ text "The Americas" ] ]
                        , li [] [ a [ href "#discover" ] [ text "Indian Ocean" ] ]
                        ]
                    ]
                , div []
                    [ h3 [ class "footer-col-title" ] [ text "Voyager" ]
                    , ul [ class "footer-links", role "list" ]
                        [ li [] [ a [ href "#process" ] [ text "How It Works" ] ]
                        , li [] [ a [ href "#insider" ] [ text "Insider's Pick" ] ]
                        , li [] [ a [ href "#stories" ] [ text "Stories" ] ]
                        , li [] [ a [ href "#join-cta" ] [ text "Newsletter" ] ]
                        ]
                    ]
                , div []
                    [ h3 [ class "footer-col-title" ] [ text "Support" ]
                    , ul [ class "footer-links", role "list" ]
                        [ li [] [ a [ href "#" ] [ text "Contact Us" ] ]
                        , li [] [ a [ href "#" ] [ text "FAQ" ] ]
                        , li [] [ a [ href "#" ] [ text "Booking Terms" ] ]
                        , li [] [ a [ href "#" ] [ text "Privacy Policy" ] ]
                        ]
                    ]
                ]
            , div [ class "footer-bottom" ]
                [ p [ class "footer-copy" ] [ text "© 2026 Voyager Travel Ltd. All rights reserved." ]
                , div [ class "footer-social", ariaLabel "Social media links" ]
                    [ a [ href "#", ariaLabel "Instagram" ]
                        [ Html.node "svg" [ attribute "viewBox" "0 0 24 24" ] [ Html.node "path" [ attribute "d" "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" ] [] ] ]
                    , a [ href "#", ariaLabel "Twitter" ]
                        [ Html.node "svg" [ attribute "viewBox" "0 0 24 24" ] [ Html.node "path" [ attribute "d" "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" ] [] ] ]
                    , a [ href "#", ariaLabel "Pinterest" ]
                        [ Html.node "svg" [ attribute "viewBox" "0 0 24 24" ] [ Html.node "path" [ attribute "d" "M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" ] [] ] ]
                    ]
                ]
            ]
        ]


renderModal : Model -> Html Msg
renderModal model =
    case model.selectedDetailDestId of
        Nothing ->
            text ""

        Just destId ->
            let
                dest =
                    if destId == "itinerary" then
                        let
                            tripDests =
                                List.filterMap (\id -> List.filter (\d -> d.id == id) destinations |> List.head) model.itinerary

                            names =
                                List.map .name tripDests |> String.join " + "

                            countries =
                                List.map .country tripDests
                                    |> List.foldl (\c acc -> if List.member c acc then acc else acc ++ [ c ]) []
                                    |> String.join ", "

                            totalPrice =
                                List.foldl (\d acc -> acc + d.price) 0 tripDests

                            firstImg =
                                List.head tripDests |> Maybe.map .image |> Maybe.withDefault "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80"

                            galleryImgs =
                                List.map .image tripDests
                        in
                        { id = "itinerary"
                        , name = "Your Custom Journey"
                        , country = if String.isEmpty countries then "Multi-Destination Voyage" else countries
                        , region = "Personalised Itinerary"
                        , moods = []
                        , image = firstImg
                        , heroImage = firstImg
                        , gallery = galleryImgs
                        , price = totalPrice
                        , duration = String.fromInt (List.length tripDests * 3) ++ " - " ++ String.fromInt (List.length tripDests * 5) ++ " nights"
                        , rating = 5.0
                        , reviewCount = List.length tripDests
                        , tags = [ "Tailored", "Multi-City", "Bespoke" ]
                        , shortDesc = "A custom-crafted route combining " ++ names ++ "."
                        , description = "This is a bespoke multi-destination itinerary designed specifically around your selections: " ++ names ++ ". Your dedicated travel curator will refine the transitions, private transport, and accommodations to ensure a seamless flow."
                        , highlights = List.map (\d -> "Explore " ++ d.name ++ " (" ++ d.country ++ ")") tripDests
                        , included = [ "Private transfers between destinations", "Luxury handpicked accommodations", "24/7 concierge support", "Personalised activity planning" ]
                        , climate = { temps = [], labels = [], price = [], best = [] }
                        , flights = "Custom flight planning included"
                        , visa = "Visa assistance provided for all destinations"
                        }

                    else
                        List.filter (\d -> d.id == destId) destinations
                            |> List.head
                            |> Maybe.withDefault (List.head destinations |> Maybe.withDefault (Destination "" "" "" "" [] "" "" [] 0 "" 0.0 0 [] "" "" [] [] (Climate [] [] [] []) "" ""))

                mainImg =
                    model.activeModalTabImage |> Maybe.withDefault dest.image

                starCount =
                    floor dest.rating

                starStr =
                    String.repeat starCount "★"

                thumbnailImg idx imgUrl =
                    img
                        [ class ("modal-thumb" ++ (if mainImg == imgUrl then " active" else ""))
                        , src imgUrl
                        , alt (dest.name ++ " photo " ++ String.fromInt (idx + 1))
                        , onClick (SetModalMainImage imgUrl)
                        , role "button"
                        , tabindex 0
                        ]
                        []

                highlightItem highlightText =
                    li [ class "modal-highlight-item" ] [ text highlightText ]

                includedItem itemText =
                    div [ class "modal-included-item" ] [ text itemText ]

                renderCalendarMonth idx label =
                    let
                        priceMultiplier =
                            List.drop idx dest.climate.price |> List.head |> Maybe.withDefault 1.0

                        isBest =
                            List.member idx dest.climate.best

                        barH =
                            round (priceMultiplier * 35.0) + 10

                        priceClass =
                            if priceMultiplier < 0.85 then
                                "price-low"

                            else if priceMultiplier > 1.3 then
                                "price-high"

                            else
                                "price-med"

                        fullClass =
                            priceClass ++ (if isBest then " best-month" else "")
                    in
                    div [ class ("calendar-month" ++ (if isBest then " is-best" else "")) ]
                        [ div [ class "calendar-bar-wrap" ]
                            [ div [ class "calendar-best-dot" ] []
                            , div [ class ("calendar-bar " ++ fullClass), style "height" (String.fromInt barH ++ "px") ] []
                            ]
                        , div [ class "calendar-month-label" ] [ text label ]
                        ]

                travelersInt =
                    String.toInt model.bookingForm.travelers |> Maybe.withDefault 2

                priceCalculated =
                    dest.price * travelersInt
            in
            div [ id "dest-modal", class "open", role "dialog", ariaModal True ]
                [ div [ class "modal-backdrop open", id "modal-backdrop", onClick CloseModal ] []
                , div [ class "modal-panel open", id "modal-panel" ]
                    [ div [ class "modal-gallery" ]
                        [ img [ id "modal-main-img", class "modal-main-img", src mainImg, alt dest.name ] []
                        , div [ class "modal-thumbnails", id "modal-thumbnails", role "list" ]
                            (List.indexedMap thumbnailImg dest.gallery)
                        , button [ class "modal-close", id "modal-close", onClick CloseModal, ariaLabel "Close" ] [ text "✕" ]
                        ]
                    , div [ class "modal-detail", id "modal-detail" ]
                        [ div []
                            [ h2 [ class "modal-destination-name", id "modal-destination-name" ] [ text dest.name ]
                            , p [ class "modal-destination-country", id "modal-destination-country" ] [ text (dest.country ++ " · " ++ dest.region) ]
                            ]
                        , div [ class "modal-badges", id "modal-badges" ]
                            (List.map (\t -> span [ class "modal-badge" ] [ text t ]) dest.tags)
                        , div [ class "modal-rating-row" ]
                            [ div [ class "modal-stars", id "modal-stars" ] [ text starStr ]
                            , span [ class "modal-rating-num", id "modal-rating-num" ] [ text (String.fromFloat dest.rating) ]
                            , span [ class "modal-rating-count", id "modal-rating-count" ] [ text ("(" ++ String.fromInt dest.reviewCount ++ " reviews)") ]
                            ]
                        , p [ class "modal-desc", id "modal-desc" ] [ text dest.description ]
                        , div []
                            [ p [ class "modal-highlights-title" ] [ text "Highlights" ]
                            , ul [ class "modal-highlights-list", id "modal-highlights" ]
                                (List.map highlightItem dest.highlights)
                            ]
                        , div []
                            [ p [ class "modal-included-title" ] [ text "What's Included" ]
                            , div [ class "modal-included-list", id "modal-included" ]
                                (List.map includedItem dest.included)
                            ]
                        , if dest.id == "itinerary" then
                            text ""

                          else
                            div [ class "modal-calendar" ]
                                [ p [ class "modal-calendar-title" ] [ text "Best Time to Visit & Price Guide" ]
                                , div [ class "calendar-grid", id "calendar-grid" ]
                                    (List.indexedMap renderCalendarMonth dest.climate.labels)
                                , div [ class "calendar-legend" ]
                                    [ div [ class "calendar-legend-item" ] [ div [ class "calendar-legend-swatch", style "background" "rgba(72,199,142,0.5)" ] [], text "Low" ]
                                    , div [ class "calendar-legend-item" ] [ div [ class "calendar-legend-swatch", style "background" "rgba(181,147,90,0.5)" ] [], text "Mid" ]
                                    , div [ class "calendar-legend-item" ] [ div [ class "calendar-legend-swatch", style "background" "rgba(201,100,70,0.5)" ] [], text "Peak" ]
                                    , div [ class "calendar-legend-item" ] [ div [ class "calendar-legend-swatch", style "background" "rgba(181,147,90,0.7)", style "outline" "1.5px solid #B5935A" ] [], text "★ Best" ]
                                    ]
                                ]
                        , div [ class "modal-travel-info" ]
                            [ div [ class "modal-info-item" ] [ p [ class "modal-info-label" ] [ text "Flights" ], p [ class "modal-info-value" ] [ text dest.flights ] ]
                            , div [ class "modal-info-item" ] [ p [ class "modal-info-label" ] [ text "Visa" ], p [ class "modal-info-value" ] [ text dest.visa ] ]
                            ]
                        , hr [ class "modal-booking-divider" ] []
                        , h3 [ class "modal-booking-title" ] [ text "Book This Journey" ]
                        , Html.form [ class "booking-form", id "booking-form", onSubmit (SubmitBookingForm dest.id) ]
                            [ div [ class "form-row" ]
                                [ div [ class "form-group" ]
                                    [ label [ for "booking-name", class "form-label" ] [ text "Full Name" ]
                                    , input [ type_ "text", id "booking-name", class "form-input", placeholder "Your name", value model.bookingForm.name, onInput UpdateBookingFormName, required True ] []
                                    ]
                                , div [ class "form-group" ]
                                    [ label [ for "booking-email", class "form-label" ] [ text "Email" ]
                                    , input [ type_ "email", id "booking-email", class "form-input", placeholder "you@email.com", value model.bookingForm.email, onInput UpdateBookingFormEmail, required True ] []
                                    ]
                                ]
                            , div [ class "form-row" ]
                                [ div [ class "form-group" ]
                                    [ label [ for "booking-checkin", class "form-label" ] [ text "Arrival" ]
                                    , input [ type_ "date", id "booking-checkin", class "form-input", value model.bookingForm.checkin, onInput UpdateBookingFormCheckin, required True ] []
                                    ]
                                , div [ class "form-group" ]
                                    [ label [ for "booking-checkout", class "form-label" ] [ text "Departure" ]
                                    , input [ type_ "date", id "booking-checkout", class "form-input", value model.bookingForm.checkout, onInput UpdateBookingFormCheckout, required True ] []
                                    ]
                                ]
                            , div [ class "form-row" ]
                                [ div [ class "form-group" ]
                                    [ label [ for "booking-travelers", class "form-label" ] [ text "Travelers" ]
                                    , select [ id "booking-travelers", class "form-select", value model.bookingForm.travelers, onInput UpdateBookingFormTravelers ]
                                        [ option [ value "1" ] [ text "1 traveler" ]
                                        , option [ value "2" ] [ text "2 travelers" ]
                                        , option [ value "3" ] [ text "3 travelers" ]
                                        , option [ value "4" ] [ text "4+ travelers" ]
                                        ]
                                    ]
                                , div [ class "form-group" ]
                                    [ label [ for "booking-budget", class "form-label" ] [ text "Budget Range" ]
                                    , select [ id "booking-budget", class "form-select", value model.bookingForm.budget, onInput UpdateBookingFormBudget ]
                                        [ option [] [ text "Under $3,000" ]
                                        , option [] [ text "$3,000 - $6,000" ]
                                        , option [] [ text "$6,000 - $10,000" ]
                                        , option [] [ text "$10,000+" ]
                                        ]
                                    ]
                                ]
                            , div [ class "form-group" ]
                                [ label [ for "booking-notes", class "form-label" ] [ text "Special Requests" ]
                                , textarea [ id "booking-notes", class "form-textarea", placeholder "Honeymoon, anniversary, dietary needs…", value model.bookingForm.notes, onInput UpdateBookingFormNotes ] []
                                ]
                            , div [ class "modal-price-summary" ]
                                [ div [ class "modal-price-block" ]
                                    [ p [ class "price-from" ] [ text "Estimated Cost" ]
                                    , p [ class "price-amount" ] [ text ("$" ++ String.fromInt priceCalculated) ]
                                    , p [ class "price-duration" ] [ text ("for " ++ model.bookingForm.travelers ++ " people · " ++ dest.duration) ]
                                    ]
                                , button [ type_ "submit", class "btn-book", id "booking-submit-btn", disabled model.submittingBooking ]
                                    [ if model.submittingBooking then
                                        span [] [ span [ class "spinner" ] [], text " Sending…" ]

                                      else
                                        span []
                                            [ text "Send Inquiry "
                                            , Html.node "svg"
                                                [ attribute "width" "14"
                                                , attribute "height" "14"
                                                , attribute "viewBox" "0 0 24 24"
                                                , attribute "fill" "none"
                                                , attribute "stroke" "currentColor"
                                                , attribute "stroke-width" "2"
                                                ]
                                                [ Html.node "line" [ attribute "x1" "5", attribute "y1" "12", attribute "x2" "19", attribute "y2" "12" ] []
                                                , Html.node "polyline" [ attribute "points" "12,5 19,12 12,19" ] []
                                                ]
                                            ]
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]


renderTripPanel : Model -> Html Msg
renderTripPanel model =
    let
        tripDests =
            List.filterMap (\id -> List.filter (\d -> d.id == id) destinations |> List.head) model.itinerary

        totalCost =
            List.foldl (\d acc -> acc + d.price) 0 tripDests

        renderTripItem dest =
            div [ class "trip-item", attribute "role" "listitem" ]
                [ img [ class "trip-item-img", src dest.image, alt dest.name ] []
                , div []
                    [ div [ class "trip-item-name" ] [ text dest.name ]
                    , div [ class "trip-item-country" ] [ text dest.country ]
                    ]
                , button [ class "trip-item-remove", onClick (RemoveFromTrip dest.id), title "Remove" ] [ text "✕" ]
                ]
    in
    div [ id "trip-panel", class (if model.isTripPanelOpen then "open" else "") ]
        [ button
            [ class "trip-panel-handle"
            , id "trip-panel-handle"
            , ariaExpanded (if model.isTripPanelOpen then "true" else "false")
            , onClick ToggleTripPanel
            ]
            [ span [ class "trip-panel-handle-text" ] [ text "Your Trip" ]
            , span [ class "trip-panel-handle-badge", id "trip-count-badge" ] [ text (String.fromInt (List.length model.itinerary)) ]
            ]
        , div [ class "trip-panel-inner", id "trip-panel-inner" ]
            [ div [ class "trip-panel-left" ]
                [ p [ class "trip-panel-title" ] [ text "Your Itinerary" ]
                , div [ class "trip-items", id "trip-items", role "list" ]
                    (List.map renderTripItem tripDests)
                , button [ class "btn-ghost", id "trip-clear-btn", onClick ClearTrip ] [ text "Clear all" ]
                ]
            , div [ class "trip-panel-right" ]
                [ div [ class "trip-total" ]
                    [ p [ class "trip-total-label" ] [ text "Estimated total" ]
                    , p [ class "trip-total-amount", id "trip-total" ] [ text ("$" ++ String.fromInt totalCost) ]
                    , p [ class "trip-total-note" ] [ text "per person · varies by date" ]
                    ]
                , button [ class "btn-primary", id "trip-inquiry-btn", onClick (OpenModal "itinerary") ]
                    [ span []
                        [ text "Send Inquiry "
                        , Html.node "svg"
                            [ attribute "width" "14"
                            , attribute "height" "14"
                            , attribute "viewBox" "0 0 24 24"
                            , attribute "fill" "none"
                            , attribute "stroke" "currentColor"
                            , attribute "stroke-width" "2"
                            ]
                            [ Html.node "line" [ attribute "x1" "5", attribute "y1" "12", attribute "x2" "19", attribute "y2" "12" ] []
                            , Html.node "polyline" [ attribute "points" "12,5 19,12 12,19" ] []
                            ]
                        ]
                    ]
                ]
            ]
        ]


renderConfirmModal : Model -> Html Msg
renderConfirmModal model =
    case model.inquirySubmittedRef of
        Nothing ->
            text ""

        Just ref ->
            div [ id "confirm-modal", class "open", role "dialog" ]
                [ div [ class "modal-backdrop open", id "confirm-backdrop", onClick CloseConfirmModal ] []
                , div [ class "confirm-panel modal-panel open" ]
                    [ div [ class "confirm-icon" ]
                        [ Html.node "svg" [ attribute "viewBox" "0 0 24 24" ]
                            [ Html.node "polyline" [ class "confirm-checkmark", attribute "points" "4,12 9,17 20,6" ] []
                            ]
                        ]
                    , h2 [ class "confirm-title" ] [ text "Inquiry Received" ]
                    , p [ class "confirm-text" ] [ text "Your travel curator will review your request and respond within 24 hours with a personalised proposal tailored to you." ]
                    , div [ class "confirm-ref", id "confirm-ref" ] [ text ("REF - " ++ ref) ]
                    , button [ class "btn-secondary", id "confirm-close", onClick CloseConfirmModal ] [ text "Continue Browsing" ]
                    ]
                ]


renderToast : Model -> Html Msg
renderToast model =
    case model.toast of
        Nothing ->
            text ""

        Just textStr ->
            div [ class "toast visible", id "toast", role "status" ]
                [ span [ class "toast-icon" ] [ text "✦" ]
                , span [ id "toast-text" ] [ text textStr ]
                ]


ariaLabel : String -> Attribute msg
ariaLabel valueStr =
    attribute "aria-label" valueStr


ariaModal : Bool -> Attribute msg
ariaModal valueBool =
    attribute "aria-modal" (if valueBool then "true" else "false")


ariaHidden : String -> Attribute msg
ariaHidden valueStr =
    attribute "aria-hidden" valueStr


ariaExpanded : String -> Attribute msg
ariaExpanded valueStr =
    attribute "aria-expanded" valueStr


role : String -> Attribute msg
role valueStr =
    attribute "role" valueStr


main : Program () Model Msg
main =
    Browser.element
        { init = \_ -> ( initialModel, Cmd.none )
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
