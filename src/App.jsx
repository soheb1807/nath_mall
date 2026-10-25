import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  MapPin,
  MessageCircle,
  Search,
  ArrowUpRight,
  ArrowRight,
  Compass,
  Sparkles,
  Users,
  ShoppingBag,
  Clock,
  Phone,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Upload,
  Check,
  Info,
  Eye,
  SlidersHorizontal,
  Image as ImageIcon,
  ExternalLink,
  ShieldCheck,
  Heart,
  Layers,
  Code2,
} from "lucide-react";

/* ============================================================================
 * 1. DATA CONFIGURATION: src/data/mallData.js
 * All business details, verified location, WhatsApp config, categories,
 * spotlights, and offers are centralized here for effortless owner updates.
 * ============================================================================ */
const INITIAL_MALL_DATA = {
  brandName: "NATH",
  fullTitle: "NATH BIGGEST FAMILY SHOPPING MALL",
  tagline: "Your Family. Your Style. Your Shopping Destination.",
  verifiedLocation: {
    town: "Saundalga",
    state: "Karnataka",
    country: "India",
    formattedAddress:
      "NATH Biggest Family Shopping Mall, Saundalga, Karnataka, India",
    googleMapsDirectionsUrl:
      "https://www.google.com/maps/search/?api=1&query=NATH+BIGGEST+FAMILY+SHOPPING+MALL+Saundalga+Karnataka+India",
    // Exact Google Maps embed centered on Nath Biggest Family Shopping Mall, Saundalga, Karnataka
    googleMapsEmbedUrl:
      "https://maps.google.com/maps?q=NATH%20BIGGEST%20FAMILY%20SHOPPING%20MALL%20Saundalga%20Karnataka%20India&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
  contact: {
    // Owner configurable WhatsApp number (digits only with country code, e.g., "919876543210").
    // Kept empty by default so no phone number is fabricated.
    whatsappNumber: "918748079394",
    phoneDisplay: "To be confirmed by store management",
    openingHours: "10 am–9 pm",
    instagramUrl: "",
    facebookUrl: "",
  },
  hero: {
    eyebrow: "NATH BIGGEST FAMILY SHOPPING MALL",
    headlineLines: [
      "YOUR FAMILY.",
      "YOUR STYLE.",
      "YOUR SHOPPING DESTINATION.",
    ],
    supportingText:
      "Discover a world of style for every generation, every occasion, and every special moment.",
    primaryCta: "EXPLORE COLLECTIONS",
    secondaryCta: "VISIT OUR STORE",
    // Points directly to the owner's uploaded photograph in /public/nath.jpg
    realMallPhotoPath: "/nath.jpg",
    fallbackRelativePath: "nath.jpg",
  },
  introduction: {
    eyebrow: "THE DESTINATION",
    headline: "ONE DESTINATION. ENDLESS POSSIBILITIES.",
    supportingCopy:
      "Discover shopping inspiration for everyday essentials, family occasions, and memorable celebrations — all in one welcoming destination.",
    editorialNote:
      "Designed for families across Saundalga and the surrounding region, NATH brings together curated attire for every generation under one roof.",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=85",
    imageCaption:
      "Illustrative Fashion Editorial — Festive & Family Apparel Inspiration",
  },
  // Section 6: Proposed categories (subject to confirmation by the owner)
  categories: [
    {
      id: "womens-fashion",
      name: "Women's Fashion",
      subtitle: "Contemporary & Classic Silhouettes",
      status: "Proposed Category",
      image:
        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85",
      span: "md:col-span-7 aspect-[16/11]",
    },
    {
      id: "sarees-ethnic",
      name: "Sarees & Ethnic Wear",
      subtitle: "Timeless Drapes & Traditional Weaves",
      status: "Proposed Category",
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85",
      span: "md:col-span-5 aspect-[4/5]",
    },
    {
      id: "mens-fashion",
      name: "Men's Fashion",
      subtitle: "Tailored Formals, Casuals & Festive Kurta Sets",
      status: "Proposed Category",
      image:
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85",
      span: "md:col-span-4 aspect-[4/5]",
    },
    {
      id: "wedding-festive",
      name: "Wedding & Festive Wear",
      subtitle: "Grand Ensembles for Milestone Occasions",
      status: "Proposed Category",
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=85",
      span: "md:col-span-8 aspect-[16/10]",
    },
    {
      id: "kids-collection",
      name: "Kids' Collection",
      subtitle: "Playful Everyday & Occasion Wear",
      status: "Proposed Category",
      image:
        "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=85",
      span: "md:col-span-4 aspect-[4/4]",
    },
    {
      id: "everyday-essentials",
      name: "Everyday Essentials",
      subtitle: "Effortless Comfort for Daily Wardrobes",
      status: "Proposed Category",
      image:
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=900&q=85",
      span: "md:col-span-4 aspect-[4/4]",
    },
    {
      id: "family-shopping",
      name: "Family Shopping",
      subtitle: "Coordinated Looks for Every Generation",
      status: "Proposed Category",
      image:
        "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=900&q=85",
      span: "md:col-span-4 aspect-[4/4]",
    },
    {
      id: "new-arrivals",
      name: "New Arrivals",
      subtitle: "Fresh Seasonal Edits & Curated Styles",
      status: "Proposed Category",
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85",
      span: "md:col-span-12 aspect-[21/9]",
    },
  ],
  // Section 8: Three Premium Collection Spotlights
  spotlights: [
    {
      id: "everyday-edit",
      label: "SPOTLIGHT 01",
      title: "THE EVERYDAY EDIT",
      subtitle: "Discover styles for your everyday moments.",
      description:
        "Refined cottons, breathable silhouettes, and versatile wardrobe staples crafted for comfort from morning errands to evening gatherings.",
      ctaText: "EXPLORE EVERYDAY STYLES",
      filterTarget: "Everyday Essentials",
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85",
      secondaryImage:
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80",
      alignment: "left",
    },
    {
      id: "celebration-festive-edit",
      label: "SPOTLIGHT 02",
      title: "CELEBRATION & FESTIVE EDIT",
      subtitle: "Make every celebration feel special.",
      description:
        "Richly woven sarees, festive kurtas, and statement occasion wear inspired by timeless Indian craftsmanship and joyful family traditions.",
      ctaText: "EXPLORE FESTIVE COLLECTION",
      filterTarget: "Wedding & Festive Wear",
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85",
      secondaryImage:
        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
      alignment: "right",
    },
    {
      id: "family-style-edit",
      label: "SPOTLIGHT 03",
      title: "FAMILY STYLE, ALL IN ONE PLACE",
      subtitle: "Shopping inspiration for every generation.",
      description:
        "From children’s festive outfits to classic menswear and graceful ethnic drapes, plan your entire family’s wardrobe in a single welcoming visit.",
      ctaText: "ENQUIRE FOR FAMILY SHOPPING",
      filterTarget: "Family Shopping",
      image:
        "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=85",
      secondaryImage:
        "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80",
      alignment: "left",
    },
  ],
  // Section 9: Special Offers Configuration (No fake discounts or timers invented)
  offers: {
    sectionTitle: "MORE TO DISCOVER. MORE TO LOVE.",
    hasVerifiedActiveOffer: false, // Set to true only when owner provides verified campaign details
    neutralHeadline: "Discover our latest collections in store.",
    neutralSubcopy:
      "Seasonal campaigns, festive edits, and official in-store announcements are shared here and via WhatsApp enquiry upon verification.",
    verifiedOfferHeadline: "",
    verifiedDiscountValue: "",
    verifiedOfferValidity: "",
  },
  // Section 10: Why Shop With NATH
  whyShopPillars: [
    {
      id: "family-destination",
      title: "Family Shopping Destination",
      description:
        "A welcoming space in Saundalga designed for parents, children, and grandparents to shop together comfortably.",
      iconName: "Users",
    },
    {
      id: "variety-collections",
      title: "Variety of Collections",
      description:
        "Proposed categories spanning sarees, ethnic wear, menswear, kids’ apparel, and daily essentials — subject to store confirmation.",
      iconName: "Layers",
    },
    {
      id: "different-occasions",
      title: "Fashion for Different Occasions",
      description:
        "Thoughtfully arranged inspiration for everyday routines, festive pujas, family gatherings, and wedding celebrations.",
      iconName: "Sparkles",
    },
    {
      id: "instore-experience",
      title: "In-Store Shopping Experience",
      description:
        "Experience fabrics, colours, and fits in person inside a modern architectural landmark with dedicated family amenities.",
      iconName: "ShoppingBag",
    },
    {
      id: "convenient-location",
      title: "Convenient Location",
      description:
        "Accessible in Saundalga, Karnataka, with spacious frontage and easy navigation for visitors from nearby towns.",
      iconName: "MapPin",
    },
    {
      id: "whatsapp-enquiries",
      title: "Direct WhatsApp Enquiries",
      description:
        "Have a question before you visit? Enquire directly on WhatsApp to check collection availability and store timings.",
      iconName: "MessageCircle",
    },
  ],
  // Section 12: Customer Experience & Reviews (No fabricated reviews or star counts)
  customerExperience: {
    eyebrow: "THE IN-STORE EXPERIENCE",
    headline: "A WELCOMING LANDMARK FOR FAMILY SHOPPING IN SAUNDALGA.",
    description:
      "At NATH Biggest Family Shopping Mall, every visit is centred around comfort, clarity, and warmth. From our spacious contemporary facade and outdoor children’s play area to attentive in-store guidance, we aim to make shopping enjoyable for every generation.",
    verifiedRating: null, // Populate only after owner reverifies exact Google Maps rating
    verifiedReviews: [], // Populate only with owner-approved genuine customer reviews
  },
};

/* ============================================================================
 * 2. ILLUSTRATIVE PRODUCT CATALOGUE DATA: src/data/products.js
 * Clearly marked as illustrative demo items to showcase the discovery and
 * WhatsApp enquiry workflow without inventing prices, discounts, or stock claims.
 * ============================================================================ */
const INITIAL_PRODUCTS = [
  {
    id: "demo-prod-1",
    name: "Zari Border Woven Silk Saree",
    category: "Sarees & Ethnic Wear",
    collectionTag: "Wedding Shopping",
    verifiedPrice: null, // Never invent prices
    isIllustrativeDemo: true,
    fabricNote: "Illustrative Festive Drape Concept",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "demo-prod-2",
    name: "Embroidered Festive Anarkali Ensemble",
    category: "Women's Fashion",
    collectionTag: "Festive Edit",
    verifiedPrice: null,
    isIllustrativeDemo: true,
    fabricNote: "Illustrative Occasion Wear Concept",
    image:
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "demo-prod-3",
    name: "Classic Tailored Bandhgala & Kurta Set",
    category: "Men's Fashion",
    collectionTag: "Wedding Shopping",
    verifiedPrice: null,
    isIllustrativeDemo: true,
    fabricNote: "Illustrative Menswear Concept",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "demo-prod-4",
    name: "Crimson Bridal & Reception Lehenga Inspiration",
    category: "Wedding & Festive Wear",
    collectionTag: "Wedding Shopping",
    verifiedPrice: null,
    isIllustrativeDemo: true,
    fabricNote: "Illustrative Bridal Edit Concept",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "demo-prod-5",
    name: "Artisanal Cotton Everyday Kurta Tunic",
    category: "Everyday Essentials",
    collectionTag: "Featured Picks",
    verifiedPrice: null,
    isIllustrativeDemo: true,
    fabricNote: "Illustrative Daily Wardrobe Concept",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "demo-prod-6",
    name: "Junior Celebration Ethnic Waistcoat & Kurta",
    category: "Kids' Collection",
    collectionTag: "Festive Edit",
    verifiedPrice: null,
    isIllustrativeDemo: true,
    fabricNote: "Illustrative Kids Occasion Concept",
    image:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "demo-prod-7",
    name: "Fine Linen & Cotton Casual Shirt Collection",
    category: "Men's Fashion",
    collectionTag: "New Arrival",
    verifiedPrice: null,
    isIllustrativeDemo: true,
    fabricNote: "Illustrative Smart Casual Concept",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "demo-prod-8",
    name: "Coordinated Multi-Generation Family Festive Edit",
    category: "Family Shopping",
    collectionTag: "Featured Picks",
    verifiedPrice: null,
    isIllustrativeDemo: true,
    fabricNote: "Illustrative Family Styling Concept",
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "demo-prod-9",
    name: "Contemporary Printed Georgette Occasion Drape",
    category: "New Arrivals",
    collectionTag: "New Arrival",
    verifiedPrice: null,
    isIllustrativeDemo: true,
    fabricNote: "Illustrative Seasonal Arrival Concept",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
  },
];

/* ============================================================================
 * 3. GALLERY ITEMS: Real Mall Slots + Clearly Labeled Illustrative Fashion
 * ============================================================================ */
const INITIAL_GALLERY_ITEMS = [
  {
    id: "gal-exterior",
    title: "NATH Biggest Family Shopping Mall — Exterior Facade",
    category: "Mall Exterior",
    isRealMallSlot: true,
    usesHeroPhoto: true,
    caption:
      "Actual exterior view of NATH Biggest Family Shopping Mall in Saundalga, Karnataka — featuring signature geometric signage, copper architectural wing, Future Fashion Studio display windows, and children’s play area.",
    aspect: "md:col-span-8 aspect-[16/10]",
  },
  {
    id: "gal-entrance",
    title: "Main Store Entrance & Welcome Foyers",
    category: "Store Entrance",
    isRealMallSlot: true,
    usesHeroPhoto: false,
    customPhotoUrl: "",
    caption:
      "Reserved for owner-supplied photograph of the main store entrance in Saundalga. Upload a real photo to preview.",
    aspect: "md:col-span-4 aspect-[4/5]",
  },
  {
    id: "gal-interior",
    title: "Multi-Floor Retail Interior & Aisles",
    category: "Interior Views",
    isRealMallSlot: true,
    usesHeroPhoto: false,
    customPhotoUrl: "",
    caption:
      "Reserved for owner-supplied interior photographs. No fabricated mall interior photos are substituted.",
    aspect: "md:col-span-4 aspect-[4/5]",
  },
  {
    id: "gal-displays",
    title: "Future Fashion Studio & Product Displays",
    category: "Product Displays",
    isRealMallSlot: true,
    usesHeroPhoto: false,
    customPhotoUrl: "",
    caption:
      "Reserved for real in-store display photography from NATH Biggest Family Shopping Mall.",
    aspect: "md:col-span-4 aspect-[4/5]",
  },
  {
    id: "gal-fashion-1",
    title: "Heritage Silk & Festive Saree Curation",
    category: "Fashion Collections",
    isRealMallSlot: false,
    imageUrl:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85",
    caption:
      "Illustrative Fashion Photography — Traditional & Festive Weaves Inspiration",
    aspect: "md:col-span-4 aspect-[4/5]",
  },
  {
    id: "gal-fashion-2",
    title: "Celebration & Wedding Occasion Edit",
    category: "Fashion Collections",
    isRealMallSlot: false,
    imageUrl:
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85",
    caption:
      "Illustrative Fashion Photography — Occasion & Ethnic Ensemble Inspiration",
    aspect: "md:col-span-6 aspect-[16/10]",
  },
  {
    id: "gal-experience-1",
    title: "Multi-Generation Family Shopping Inspiration",
    category: "Shopping Experience",
    isRealMallSlot: false,
    imageUrl:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=85",
    caption: "Illustrative Editorial Photography — Family Style & Togetherness",
    aspect: "md:col-span-6 aspect-[16/10]",
  },
];

/* ============================================================================
 * 4. REUSABLE WHATSAPP ENQUIRY HELPER
 * Builds a safe, URL-encoded WhatsApp link or opens the interactive enquiry
 * preview modal if the owner has not yet entered their phone number.
 * ============================================================================ */
function buildWhatsAppUrl(whatsappNumber, itemOrTopic = "your collections") {
  const cleanNumber = (whatsappNumber || "08748079394").replace(/[^0-9]/g, "");
  const message = `Hello NATH BIGGEST FAMILY SHOPPING MALL, I would like to enquire about ${itemOrTopic}. Please share the price and availability.`;
  const encodedMessage = encodeURIComponent(message);
  if (cleanNumber) {
    return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
  }
  return `https://api.whatsapp.com/send?text=${encodedMessage}`;
}

/* ============================================================================
 * 5. SUB-COMPONENTS
 * ============================================================================ */

/**
 * Refined Section Header following the luxury Indian department store aesthetic
 */
function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  light = false,
  badge = null,
}) {
  const alignClasses =
    align === "center"
      ? "text-center items-center mx-auto max-w-3xl"
      : "text-left items-start max-w-3xl";

  return (
    <div className={`flex flex-col ${alignClasses} mb-12 md:mb-16`}>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span
          className={`inline-block text-[11px] sm:text-xs uppercase tracking-[0.28em] font-semibold ${
            light ? "text-[#B89A62]" : "text-[#651E2B]"
          }`}
        >
          {eyebrow}
        </span>
        {badge && (
          <span
            className={`text-[10px] uppercase tracking-[0.18em] px-2.5 py-0.5 border ${
              light
                ? "border-[#B89A62]/40 text-[#F8F5EF]/80 bg-[#3B101A]/50"
                : "border-[#B89A62]/50 text-[#651E2B] bg-[#B89A62]/10"
            }`}
          >
            {badge}
          </span>
        )}
      </div>

      <h2
        className={`font-serif text-3xl sm:text-5xl lg:text-[56px] leading-[1.08] tracking-[-0.01em] font-medium ${
          light ? "text-[#F8F5EF]" : "text-[#22201F]"
        }`}
      >
        {title}
      </h2>

      <div className="w-16 h-[1px] bg-[#B89A62] my-5" />

      {subtitle && (
        <p
          className={`text-base sm:text-lg leading-relaxed font-normal ${
            light ? "text-[#F8F5EF]/80" : "text-[#22201F]/75"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

/**
 * Premium Navigation Bar (`src/components/Navbar.jsx`)
 */
function Navbar({ activeSection, onNavigate, onOpenEnquiry }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 36);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "collections", label: "Collections" },
    { id: "categories", label: "Categories" },
    { id: "about", label: "About" },
    { id: "gallery", label: "Gallery" },
    { id: "visit", label: "Visit Us" },
  ];

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#F8F5EF]/95 backdrop-blur-md border-b border-[#B89A62]/30 py-3.5 shadow-[0_8px_30px_rgb(34,32,31,0.05)]"
            : "bg-gradient-to-b from-[#22201F]/85 via-[#22201F]/45 to-transparent py-5 border-b border-[#F8F5EF]/15"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Typographic Wordmark (Never invents an unverified graphic logo) */}
          <button
            type="button"
            onClick={() => handleNavClick("home")}
            className="text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B89A62]"
            aria-label="NATH Biggest Family Shopping Mall Home"
          >
            <div className="flex items-baseline gap-2">
              <span
                className={`font-serif text-2xl sm:text-3xl lg:text-[34px] tracking-[0.18em] font-semibold transition-colors duration-300 ${
                  isScrolled ? "text-[#651E2B]" : "text-[#F8F5EF]"
                }`}
              >
                NATH
              </span>
              <span className="hidden xl:inline-block w-1.5 h-1.5 rounded-full bg-[#B89A62] mb-1" />
            </div>
            <span
              className={`block text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.26em] font-medium -mt-1 transition-colors duration-300 ${
                isScrolled ? "text-[#22201F]/75" : "text-[#B89A62]"
              }`}
            >
              BIGGEST FAMILY SHOPPING MALL
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-7 xl:gap-9"
            aria-label="Primary Navigation"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-2 text-xs uppercase tracking-[0.22em] font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B89A62] ${
                    isScrolled
                      ? isActive
                        ? "text-[#651E2B] font-semibold"
                        : "text-[#22201F]/80 hover:text-[#651E2B]"
                      : isActive
                        ? "text-[#FFFFFF] font-semibold"
                        : "text-[#F8F5EF]/85 hover:text-[#FFFFFF]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B89A62]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Standout EXPLORE NOW CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => handleNavClick("catalogue")}
              className={`hidden sm:inline-flex items-center gap-2.5 px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] font-semibold transition-all duration-300 border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B89A62] ${
                isScrolled
                  ? "bg-[#651E2B] text-[#F8F5EF] border-[#651E2B] hover:bg-[#3B101A]"
                  : "bg-[#F8F5EF] text-[#3B101A] border-[#F8F5EF] hover:bg-[#B89A62] hover:border-[#B89A62] hover:text-[#22201F]"
              }`}
            >
              <span>EXPLORE NOW</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className={`lg:hidden p-2.5 border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B89A62] ${
                isScrolled
                  ? "border-[#22201F]/20 text-[#22201F] hover:border-[#651E2B]"
                  : "border-[#F8F5EF]/30 text-[#F8F5EF] hover:border-[#B89A62]"
              }`}
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Animated Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#22201F]/70 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "tween",
                duration: 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-[#F8F5EF] text-[#22201F] shadow-2xl border-l border-[#B89A62]/30 flex flex-col justify-between p-6 pt-24 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-2">
                <div className="pb-4 mb-4 border-b border-[#B89A62]/30">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#651E2B] font-semibold">
                    Navigation Directory
                  </p>
                </div>
                {navItems.map((item, idx) => (
                  <motion.button
                    key={item.id}
                    type="button"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between py-3.5 px-3 text-left border-b border-[#22201F]/10 transition-colors ${
                      activeSection === item.id
                        ? "text-[#651E2B] font-semibold bg-[#B89A62]/10"
                        : "text-[#22201F]"
                    }`}
                  >
                    <span className="font-serif text-2xl tracking-wide">
                      {item.label}
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#B89A62]" />
                  </motion.button>
                ))}
              </div>

              <div className="pt-8 space-y-4">
                <button
                  type="button"
                  onClick={() => handleNavClick("catalogue")}
                  className="w-full py-4 px-6 bg-[#651E2B] text-[#F8F5EF] text-xs uppercase tracking-[0.22em] font-semibold flex items-center justify-center gap-2 hover:bg-[#3B101A] transition-colors"
                >
                  <span>EXPLORE NOW</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEnquiry(
                      "Visiting NATH Biggest Family Shopping Mall, Saundalga",
                    );
                  }}
                  className="w-full py-3.5 px-6 border border-[#651E2B] text-[#651E2B] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 hover:bg-[#651E2B]/5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WHATSAPP ENQUIRY</span>
                </button>
                <div className="pt-2 flex items-center gap-2 text-xs text-[#22201F]/70">
                  <MapPin className="w-3.5 h-3.5 text-[#651E2B] shrink-0" />
                  <span>Saundalga, Karnataka, India</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * 3. HERO SECTION (`src/components/Hero.jsx`)
 * Uses the owner's actual photograph of NATH BIGGEST FAMILY SHOPPING MALL (`nath.jpg`)
 * as the visual centrepiece. Never substitutes AI architecture or another building.
 */
function Hero({
  mallData,
  heroPhotoUrl,
  heroImageLoaded,
  onHeroImageLoad,
  onHeroImageError,
  onUploadRealPhoto,
  onNavigate,
}) {
  const prefersReducedMotion = useReducedMotion();
  const fileInputRef = useRef(null);
  const [heroLayoutMode, setHeroLayoutMode] = useState("editorial-campaign"); // 'editorial-campaign' | 'full-facade'

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadRealPhoto(file);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen bg-[#22201F] text-[#F8F5EF] overflow-hidden flex flex-col justify-between"
    >
      {/* Hidden file input so the owner can immediately load nath.jpg if running in a cloud sandbox */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload real NATH Mall photograph (nath.jpg)"
      />

      {/* PRIMARY HERO VISUAL — Real Mall Photograph (`nath.jpg`) */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroPhotoUrl}
          alt="NATH Biggest Family Shopping Mall in Saundalga, Karnataka — Actual Building Exterior"
          onLoad={onHeroImageLoad}
          onError={onHeroImageError}
          className={`w-full h-full transition-all duration-1000 ${
            heroLayoutMode === "full-facade"
              ? "object-contain bg-[#181514] object-center"
              : "object-cover object-[58%_center] sm:object-center"
          } ${heroImageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
        />

        {/* Carefully controlled dark burgundy/charcoal gradient overlay ONLY for text legibility */}
        {heroImageLoaded && (
          <>
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                heroLayoutMode === "full-facade"
                  ? "bg-gradient-to-t from-[#22201F] via-[#22201F]/30 to-[#22201F]/60"
                  : "bg-gradient-to-r from-[#22201F]/90 via-[#22201F]/55 to-[#22201F]/20"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#22201F] via-transparent to-[#22201F]/40" />
          </>
        )}

        {/* If /nath.jpg hasn't resolved yet in the browser preview sandbox, show an unmistakable,
            zero-fake-building architectural frame instructing how to bind `nath.jpg` in 1 click */}
        {!heroImageLoaded && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,#651E2B_0%,#3B101A_45%,#22201F_100%)] flex items-center justify-end p-6 lg:p-16">
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[linear-gradient(to_right,#B89A62_1px,transparent_1px),linear-gradient(to_bottom,#B89A62_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          </div>
        )}
      </div>

      {/* Top Spacer for Fixed Navbar */}
      <div className="h-24 sm:h-28 relative z-10" />

      {/* Main Hero Editorial Content Grid */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-8 md:py-14 lg:py-16 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Left Column: Campaign Typography & CTAs */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6 sm:space-y-8">
            {/* Location & Eyebrow Label */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#651E2B]/90 border border-[#B89A62]/50 text-[#F8F5EF] text-[10px] sm:text-xs uppercase tracking-[0.26em] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89A62]" />
                {mallData.hero.eyebrow}
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#22201F]/80 border border-[#F8F5EF]/20 text-[#B89A62] text-[11px] uppercase tracking-[0.18em]">
                <MapPin className="w-3.5 h-3.5 text-[#B89A62]" />
                <span>Saundalga, Karnataka, India</span>
              </span>
            </motion.div>

            {/* Large Premium Headline */}
            <div className="space-y-1">
              {mallData.hero.headlineLines.map((line, index) => (
                <motion.h1
                  key={line}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.12 + index * 0.12 }}
                  className={`font-serif text-4xl sm:text-6xl lg:text-[68px] xl:text-[76px] leading-[1.03] tracking-[-0.01em] font-medium ${
                    index === 1 ? "italic text-[#B89A62]" : "text-[#FFFFFF]"
                  }`}
                >
                  {line}
                </motion.h1>
              ))}
            </div>

            {/* Supporting Text */}
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="max-w-xl text-base sm:text-lg lg:text-xl text-[#F8F5EF]/90 font-normal leading-relaxed border-l-2 border-[#B89A62] pl-5"
            >
              {mallData.hero.supportingText}
            </motion.p>

            {/* Primary & Secondary CTA Buttons */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.58 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <button
                type="button"
                onClick={() => onNavigate("catalogue")}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#651E2B] hover:bg-[#3B101A] text-[#FFFFFF] border border-[#B89A62]/60 text-xs sm:text-[13px] uppercase tracking-[0.24em] font-semibold transition-all duration-300 shadow-[0_12px_35px_rgba(0,0,0,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B89A62]"
              >
                <span>{mallData.hero.primaryCta}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-[#B89A62]" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate("visit")}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#22201F]/75 hover:bg-[#F8F5EF] text-[#F8F5EF] hover:text-[#22201F] border border-[#F8F5EF]/40 text-xs sm:text-[13px] uppercase tracking-[0.24em] font-semibold transition-all duration-300 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B89A62]"
              >
                <MapPin className="w-4 h-4 text-[#B89A62] group-hover:text-[#651E2B]" />
                <span>{mallData.hero.secondaryCta}</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Architectural Showcase Card / Real Photograph Frame Control */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 xl:col-span-5"
          >
            {heroImageLoaded ? (
              <div className="bg-[#22201F]/80 backdrop-blur-md border border-[#B89A62]/40 p-4 sm:p-5 shadow-2xl">
                <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-[#B89A62]/25">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[#B89A62] font-semibold">
                      Official Building Exterior — Saundalga
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        setHeroLayoutMode((m) =>
                          m === "editorial-campaign"
                            ? "full-facade"
                            : "editorial-campaign",
                        )
                      }
                      className="text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 border border-[#B89A62]/40 text-[#F8F5EF]/90 hover:bg-[#B89A62] hover:text-[#22201F] transition-colors"
                      title="Toggle between Full Uncropped Building View and Editorial Fill"
                    >
                      {heroLayoutMode === "full-facade"
                        ? "Editorial Crop"
                        : "Fit Full Building"}
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 border border-[#F8F5EF]/25 text-[#F8F5EF]/80 hover:border-[#B89A62] hover:text-[#B89A62] transition-colors"
                      title="Update or reload nath.jpg"
                    >
                      Change Photo
                    </button>
                  </div>
                </div>

                {/* Uncropped architectural miniature so the entire building, NATH signage, and play area are always 100% visible */}
                <div className="relative aspect-[16/9] w-full overflow-hidden border border-[#B89A62]/30 bg-[#161413]">
                  <img
                    src={heroPhotoUrl}
                    alt="Full uncropped facade of NATH Biggest Family Shopping Mall, Saundalga"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2.5 py-1 bg-[#22201F]/85 backdrop-blur-sm border border-[#B89A62]/30 text-[10px] tracking-[0.16em] uppercase text-[#F8F5EF]/90">
                    <span>NATH • Future Fashion Studio</span>
                    <span className="text-[#B89A62]">Saundalga, KA</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Obvious, Zero-Substitution Placeholder when /public/nath.jpg is awaiting selection in browser preview */
              <div className="bg-[#22201F]/95 border-2 border-dashed border-[#B89A62] p-6 sm:p-8 shadow-2xl space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-block text-[10px] uppercase tracking-[0.24em] text-[#B89A62] font-semibold mb-1">
                      AUTHENTICITY PRESERVATION MODE
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#FFFFFF]">
                      Your Real Mall Photograph (
                      <code className="text-[#B89A62]">nath.jpg</code>)
                    </h2>
                  </div>
                  <ImageIcon className="w-8 h-8 text-[#B89A62] shrink-0" />
                </div>

                <p className="text-xs sm:text-sm text-[#F8F5EF]/85 leading-relaxed">
                  Per strict brand rules,{" "}
                  <strong>no stock mall or AI architecture</strong> has been
                  substituted. In your local Vite project, place your uploaded
                  photograph at{" "}
                  <code className="px-1.5 py-0.5 bg-[#3B101A] text-[#B89A62] border border-[#B89A62]/30">
                    public/nath.jpg
                  </code>
                  . To preview your exact uploaded{" "}
                  <code className="text-[#B89A62]">nath.jpg</code> live right
                  now in this browser window, click below:
                </p>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3.5 px-5 bg-[#B89A62] hover:bg-[#c9ab72] text-[#22201F] text-xs uppercase tracking-[0.22em] font-bold flex items-center justify-center gap-2.5 transition-all shadow-lg"
                >
                  <Upload className="w-4 h-4" />
                  <span>Select Your Uploaded nath.jpg Photo</span>
                </button>

                <p className="text-[11px] text-[#F8F5EF]/60 leading-normal">
                  Once selected, your real NATH Biggest Family Shopping Mall
                  photograph immediately becomes the full-bleed Hero centrepiece
                  and populates the Mall Exterior gallery.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Bottom Hero Bar & Refined Scroll Indicator */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12 pb-6 pt-4 border-t border-[#F8F5EF]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F8F5EF]/75">
        <div className="flex flex-wrap items-center gap-6">
          <span className="uppercase tracking-[0.22em] text-[10px] text-[#B89A62] font-semibold">
            ONE STOP ALL FAMILY SHOPPING
          </span>
          <span className="hidden sm:inline text-[#F8F5EF]/30">|</span>
          <span className="text-xs text-[#F8F5EF]/80">
            Women’s • Sarees & Ethnic • Men’s • Kids’ • Wedding & Festive
          </span>
        </div>

        <button
          type="button"
          onClick={() => onNavigate("about")}
          className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-[#F8F5EF]/80 hover:text-[#B89A62] transition-colors"
        >
          <span>SCROLL TO DISCOVER</span>
          <span className="w-7 h-7 rounded-full border border-[#B89A62]/50 flex items-center justify-center group-hover:border-[#B89A62]">
            <motion.span
              animate={prefersReducedMotion ? {} : { y: [0, 4, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 rounded-full bg-[#B89A62]"
            />
          </span>
        </button>
      </div>
    </section>
  );
}

/**
 * 5. EDITORIAL INTRODUCTION (`src/components/Introduction.jsx`)
 * Oversized headline, asymmetric editorial split layout, zero fabricated company history.
 */
function Introduction({ mallData, onNavigate }) {
  return (
    <section
      id="about"
      className="py-20 sm:py-28 lg:py-36 bg-[#F8F5EF] text-[#22201F] border-b border-[#B89A62]/25 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Headline & Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#651E2B]" />
              <span className="text-xs uppercase tracking-[0.28em] text-[#651E2B] font-semibold">
                {mallData.introduction.eyebrow}
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[62px] leading-[1.06] tracking-[-0.01em] text-[#22201F] font-medium">
              {mallData.introduction.headline}
            </h2>

            <p className="text-lg sm:text-xl text-[#22201F]/85 leading-relaxed font-normal">
              {mallData.introduction.supportingCopy}
            </p>

            <p className="text-sm sm:text-base text-[#22201F]/70 leading-relaxed border-l border-[#B89A62] pl-5">
              {mallData.introduction.editorialNote}
            </p>

            {/* Refined Architectural Detail Pillars (No invented dates or square footage) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#B89A62]/30">
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-[#651E2B] font-semibold mb-1">
                  CURATION
                </p>
                <p className="font-serif text-xl text-[#22201F]">
                  Every Generation
                </p>
                <p className="text-xs text-[#22201F]/65 mt-1">
                  Styles for women, men, and children
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-[#651E2B] font-semibold mb-1">
                  OCCASIONS
                </p>
                <p className="font-serif text-xl text-[#22201F]">
                  Daily to Festive
                </p>
                <p className="text-xs text-[#22201F]/65 mt-1">
                  Everyday staples & celebration attire
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-[#651E2B] font-semibold mb-1">
                  DESTINATION
                </p>
                <p className="font-serif text-xl text-[#22201F]">Saundalga</p>
                <p className="text-xs text-[#22201F]/65 mt-1">
                  Welcoming family retail landmark
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate("categories")}
                className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.24em] font-semibold text-[#651E2B] hover:text-[#3B101A]"
              >
                <span className="border-b border-[#651E2B] pb-1">
                  DISCOVER PROPOSED CATEGORIES
                </span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Layered Asymmetric Composition */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Decorative Champagne Gold Offset Frame */}
              <div className="hidden sm:block absolute -top-5 -right-5 w-full h-full border border-[#B89A62]/50 pointer-events-none" />

              <div className="relative overflow-hidden border border-[#B89A62]/30 bg-[#3B101A] aspect-[4/5]">
                <img
                  src={mallData.introduction.image}
                  alt={mallData.introduction.imageCaption}
                  loading="lazy"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#22201F]/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#F8F5EF]/85 bg-[#22201F]/75 backdrop-blur-sm px-3.5 py-2 border border-[#B89A62]/30">
                  <span>{mallData.introduction.imageCaption}</span>
                </div>
              </div>

              {/* Floating Editorial Monogram Card */}
              <div className="sm:absolute -bottom-8 -left-8 mt-4 sm:mt-0 bg-[#651E2B] text-[#F8F5EF] p-6 sm:p-7 max-w-xs border border-[#B89A62]/50 shadow-xl">
                <p className="text-[10px] uppercase tracking-[0.26em] text-[#B89A62] mb-2">
                  NATH SHOPPING EXPERIENCE
                </p>
                <p className="font-serif text-xl leading-snug italic">
                  “Thoughtfully curated fashion for every family milestone and
                  everyday moment.”
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * 6. SHOP BY CATEGORY (`src/components/Categories.jsx`)
 * Title: "FIND YOUR NEXT FAVOURITE."
 * Configurable through mallData.js and clearly labeled as proposed categories.
 */
function Categories({ categories, onSelectCategory }) {
  return (
    <section
      id="categories"
      className="py-20 sm:py-28 lg:py-32 bg-[#F8F5EF] text-[#22201F] border-b border-[#B89A62]/25"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <SectionHeader
          eyebrow="CURATED DEPARTMENTS"
          title="FIND YOUR NEXT FAVOURITE."
          subtitle="Explore our proposed fashion and lifestyle departments. Select any category to browse inspiration and send a direct WhatsApp enquiry."
          badge="Proposed Categories — Subject to Owner Confirmation"
        />

        {/* Asymmetric Editorial Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {categories.map((cat, idx) => (
            <motion.article
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.08 }}
              onClick={() => onSelectCategory(cat.name)}
              className={`group relative overflow-hidden border border-[#B89A62]/35 bg-[#22201F] cursor-pointer ${cat.span}`}
            >
              <img
                src={cat.image}
                alt={`${cat.name} — Illustrative Fashion Category`}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#22201F]/90 via-[#22201F]/25 to-transparent transition-opacity duration-300 group-hover:from-[#3B101A]/95" />

              {/* Top Badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 bg-[#22201F]/75 backdrop-blur-sm text-[#B89A62] border border-[#B89A62]/30">
                  {cat.status}
                </span>
                <span className="w-9 h-9 rounded-full bg-[#F8F5EF]/10 backdrop-blur-sm border border-[#F8F5EF]/30 flex items-center justify-center text-[#F8F5EF] group-hover:bg-[#B89A62] group-hover:text-[#22201F] group-hover:border-[#B89A62] transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              {/* Bottom Editorial Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col justify-end">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#B89A62] mb-1.5">
                  {cat.subtitle}
                </p>
                <div className="flex items-end justify-between gap-4">
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#FFFFFF] font-normal tracking-wide">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-[#F8F5EF]/80 group-hover:text-[#B89A62] transition-colors shrink-0 hidden sm:inline-block">
                    Explore →
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * 7. VISUAL PRODUCT DISCOVERY (`src/components/ProductCatalogue.jsx`)
 * Search input, Category filtering, Collection edits, clear separation of illustrative
 * demo catalogue vs confirmed stock, and direct WhatsApp enquiry per item.
 */
function ProductCatalogue({
  products,
  categories,
  selectedCategory,
  onSelectCategory,
  onEnquireProduct,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollectionEdit, setSelectedCollectionEdit] =
    useState("All Edits");

  const collectionEdits = [
    "All Edits",
    "New Arrival",
    "Featured Picks",
    "Festive Edit",
    "Wedding Shopping",
  ];

  const categoryFilterOptions = useMemo(() => {
    return ["All Categories", ...categories.map((c) => c.name)];
  }, [categories]);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory =
        selectedCategory === "All Categories" ||
        item.category === selectedCategory;
      const matchesEdit =
        selectedCollectionEdit === "All Edits" ||
        item.collectionTag === selectedCollectionEdit;
      const matchesSearch =
        !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.collectionTag.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesEdit && matchesSearch;
    });
  }, [products, selectedCategory, selectedCollectionEdit, searchQuery]);

  return (
    <section
      id="catalogue"
      className="py-20 sm:py-28 lg:py-32 bg-[#F8F5EF] text-[#22201F] border-b border-[#B89A62]/25"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <SectionHeader
          eyebrow="VISUAL PRODUCT DISCOVERY"
          title="CURATED STYLE CATALOGUE."
          subtitle="Browse style inspiration across our collections and enquire directly via WhatsApp for current in-store availability and pricing — no account required."
          badge="Illustrative Demo Catalogue"
        />

        {/* Honest Transparency Banner separating illustrative demo products from confirmed inventory */}
        <div className="mb-10 p-4 sm:p-5 bg-[#651E2B]/5 border border-[#B89A62]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <Info className="w-5 h-5 text-[#651E2B] shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-[#22201F]/80 leading-relaxed">
              <strong className="text-[#651E2B] font-semibold">
                Illustrative Catalogue Notice:
              </strong>{" "}
              The styles shown below feature illustrative fashion photography to
              demonstrate visual discovery and one-click WhatsApp enquiries.
              Unverified prices, discounts, or brand claims are never
              fabricated. Real store inventory can be updated anytime in{" "}
              <code className="px-1.5 py-0.5 bg-[#22201F]/10 text-[#651E2B] font-mono text-xs">
                src/data/products.js
              </code>
              .
            </p>
          </div>
          {(selectedCategory !== "All Categories" ||
            selectedCollectionEdit !== "All Edits" ||
            searchQuery) && (
            <button
              type="button"
              onClick={() => {
                onSelectCategory("All Categories");
                setSelectedCollectionEdit("All Edits");
                setSearchQuery("");
              }}
              className="text-xs uppercase tracking-[0.2em] text-[#651E2B] font-semibold underline shrink-0"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Search & Collection Edit Controls */}
        <div className="space-y-6 mb-12">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Collection Edit Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
              {collectionEdits.map((edit) => {
                const active = selectedCollectionEdit === edit;
                return (
                  <button
                    key={edit}
                    type="button"
                    onClick={() => setSelectedCollectionEdit(edit)}
                    className={`px-4 py-2.5 text-xs uppercase tracking-[0.2em] font-semibold whitespace-nowrap border transition-all ${
                      active
                        ? "bg-[#651E2B] text-[#F8F5EF] border-[#651E2B]"
                        : "bg-white text-[#22201F]/80 border-[#B89A62]/35 hover:border-[#651E2B]"
                    }`}
                  >
                    {edit}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[280px] sm:min-w-[340px]">
              <Search className="w-4 h-4 text-[#651E2B] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sarees, kurtas, kids, festive..."
                aria-label="Search catalogue styles"
                className="w-full pl-11 pr-10 py-2.5 bg-white border border-[#B89A62]/45 text-sm text-[#22201F] placeholder-[#22201F]/45 focus:outline-none focus:border-[#651E2B]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#22201F]/50 hover:text-[#651E2B]"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#22201F]/60 font-semibold mr-2 flex items-center gap-1.5 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#651E2B]" />
              Category:
            </span>
            {categoryFilterOptions.map((catName) => {
              const active = selectedCategory === catName;
              return (
                <button
                  key={catName}
                  type="button"
                  onClick={() => onSelectCategory(catName)}
                  className={`px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] whitespace-nowrap border transition-colors ${
                    active
                      ? "bg-[#22201F] text-[#B89A62] border-[#22201F] font-semibold"
                      : "bg-transparent text-[#22201F]/75 border-[#22201F]/20 hover:border-[#651E2B]"
                  }`}
                >
                  {catName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-white border border-[#B89A62]/30 p-8 space-y-4">
            <p className="font-serif text-2xl text-[#22201F]">
              No matching styles found for your current filter.
            </p>
            <p className="text-sm text-[#22201F]/70 max-w-md mx-auto">
              Try clearing your search filter or send us a direct WhatsApp
              message to ask about a specific outfit or fabric.
            </p>
            <button
              type="button"
              onClick={() => {
                onSelectCategory("All Categories");
                setSelectedCollectionEdit("All Edits");
                setSearchQuery("");
              }}
              className="px-6 py-3 bg-[#651E2B] text-[#F8F5EF] text-xs uppercase tracking-[0.2em] font-semibold"
            >
              Show All Catalogue Styles
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="group bg-white border border-[#B89A62]/30 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_16px_40px_rgba(34,32,31,0.08)]"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#22201F]">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 bg-[#22201F]/85 backdrop-blur-sm text-[#B89A62] text-[10px] uppercase tracking-[0.2em] font-semibold border border-[#B89A62]/30">
                        {product.collectionTag}
                      </span>
                      {product.isIllustrativeDemo && (
                        <span className="px-2 py-0.5 bg-[#F8F5EF]/90 text-[#22201F] text-[9px] uppercase tracking-[0.18em] font-medium">
                          Illustrative Preview
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-6 space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-[#651E2B] font-semibold">
                      <span>{product.category}</span>
                      <span>{product.fabricNote}</span>
                    </div>

                    <h3 className="font-serif text-2xl text-[#22201F] font-medium leading-snug">
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#22201F]/70 pt-1">
                      {product.verifiedPrice ? (
                        <span className="font-semibold text-[#22201F] text-sm">
                          {product.verifiedPrice}
                        </span>
                      ) : (
                        <span className="italic">
                          Price & current store availability shared upon enquiry
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* WhatsApp Conversion CTA */}
                <div className="px-6 pb-6 pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      onEnquireProduct(
                        `${product.name} (${product.category} — ${product.collectionTag})`,
                      )
                    }
                    className="w-full py-3.5 px-4 bg-[#651E2B] hover:bg-[#3B101A] text-[#F8F5EF] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B89A62]"
                  >
                    <MessageCircle className="w-4 h-4 text-[#B89A62]" />
                    <span>ENQUIRE ON WHATSAPP</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * 8. PREMIUM COLLECTION SPOTLIGHTS (`src/components/CollectionSpotlights.jsx`)
 * Three large, visually distinctive editorial sections:
 * A. THE EVERYDAY EDIT
 * B. CELEBRATION & FESTIVE EDIT
 * C. FAMILY STYLE, ALL IN ONE PLACE
 */
function CollectionSpotlights({ spotlights, onSelectCategory, onEnquire }) {
  return (
    <section
      id="collections"
      className="py-20 sm:py-28 lg:py-36 bg-[#22201F] text-[#F8F5EF] border-b border-[#B89A62]/30 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <SectionHeader
          eyebrow="SEASONAL & SIGNATURE EDITS"
          title="CURATED FOR EVERY CHAPTER."
          subtitle="Three signature lookbooks designed around the moments that matter most to you and your family."
          light
          badge="Illustrative Fashion Lookbooks"
        />

        <div className="space-y-24 lg:space-y-36 mt-12">
          {spotlights.map((spot, idx) => {
            const isReversed = spot.alignment === "right";
            return (
              <motion.div
                key={spot.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.75 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                {/* Editorial Image Composition */}
                <div
                  className={`lg:col-span-7 relative ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="relative aspect-[16/11] overflow-hidden border border-[#B89A62]/40 bg-[#3B101A]">
                    <img
                      src={spot.image}
                      alt={`${spot.title} — Illustrative Fashion Editorial`}
                      loading="lazy"
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#22201F]/70 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-[#22201F]/80 backdrop-blur-sm border border-[#B89A62]/40 text-[10px] uppercase tracking-[0.2em] text-[#B89A62]">
                      Illustrative Editorial Photography
                    </span>
                  </div>

                  {/* Layered Secondary Accent Image */}
                  <div
                    className={`hidden sm:block absolute -bottom-8 ${
                      isReversed ? "-left-8" : "-right-8"
                    } w-48 lg:w-60 aspect-[4/5] border-2 border-[#B89A62] bg-[#22201F] overflow-hidden shadow-2xl`}
                  >
                    <img
                      src={spot.secondaryImage}
                      alt={`${spot.title} detail`}
                      loading="lazy"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>

                {/* Editorial Copy & CTA */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs uppercase tracking-[0.28em] text-[#B89A62] font-semibold">
                      {spot.label}
                    </span>
                    <span className="w-10 h-[1px] bg-[#B89A62]/50" />
                  </div>

                  <h3 className="font-serif text-3xl sm:text-5xl leading-[1.08] text-[#FFFFFF] font-normal">
                    {spot.title}
                  </h3>

                  <p className="font-serif italic text-xl sm:text-2xl text-[#B89A62]">
                    “{spot.subtitle}”
                  </p>

                  <p className="text-sm sm:text-base text-[#F8F5EF]/80 leading-relaxed">
                    {spot.description}
                  </p>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => onSelectCategory(spot.filterTarget)}
                      className="inline-flex items-center gap-3 px-7 py-4 bg-[#651E2B] hover:bg-[#B89A62] text-[#F8F5EF] hover:text-[#22201F] border border-[#B89A62]/60 text-xs uppercase tracking-[0.22em] font-semibold transition-all duration-300"
                    >
                      <span>{spot.ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onEnquire(`${spot.title} (${spot.subtitle})`)
                      }
                      className="inline-flex items-center gap-2 px-5 py-4 border border-[#F8F5EF]/30 hover:border-[#B89A62] text-xs uppercase tracking-[0.2em] text-[#F8F5EF]/90 hover:text-[#B89A62] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Ask on WhatsApp</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * 9. SPECIAL OFFERS SECTION (`src/components/Offers.jsx`)
 * Title: "MORE TO DISCOVER. MORE TO LOVE."
 * Strictly avoids fake discounts, countdown timers, or unverified promotional claims.
 */
function Offers({ offersConfig, onNavigate, onEnquire }) {
  return (
    <section
      id="offers"
      className="py-16 sm:py-24 bg-[#3B101A] text-[#F8F5EF] border-b border-[#B89A62]/35 relative overflow-hidden"
    >
      {/* Subtle geometric fine border framing */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="border border-[#B89A62]/45 bg-[#22201F]/55 backdrop-blur-sm p-8 sm:p-12 lg:p-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-[#B89A62]" />
                <span className="text-xs uppercase tracking-[0.28em] text-[#B89A62] font-semibold">
                  {offersConfig.sectionTitle}
                </span>
              </div>

              {offersConfig.hasVerifiedActiveOffer ? (
                <>
                  <h2 className="font-serif text-3xl sm:text-5xl text-[#FFFFFF] leading-tight">
                    {offersConfig.verifiedOfferHeadline}
                  </h2>
                  <p className="text-lg text-[#B89A62] font-medium">
                    {offersConfig.verifiedDiscountValue} •{" "}
                    {offersConfig.verifiedOfferValidity}
                  </p>
                </>
              ) : (
                <>
                  <h2 className="font-serif text-3xl sm:text-5xl text-[#FFFFFF] leading-tight">
                    {offersConfig.neutralHeadline}
                  </h2>
                  <p className="text-sm sm:text-base text-[#F8F5EF]/80 max-w-2xl leading-relaxed">
                    {offersConfig.neutralSubcopy}
                  </p>
                </>
              )}
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-end">
              <button
                type="button"
                onClick={() =>
                  onEnquire("Current in-store collections and seasonal updates")
                }
                className="w-full py-4 px-6 bg-[#B89A62] hover:bg-[#c8aa70] text-[#22201F] text-xs uppercase tracking-[0.22em] font-bold flex items-center justify-center gap-2.5 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>ENQUIRE ON WHATSAPP</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate("visit")}
                className="w-full py-4 px-6 border border-[#F8F5EF]/35 hover:border-[#B89A62] text-[#F8F5EF] text-xs uppercase tracking-[0.22em] font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <span>VISIT OUR SAUNDALGA STORE</span>
                <ArrowRight className="w-4 h-4 text-[#B89A62]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 10. WHY SHOP WITH NATH? (`src/components/WhyChooseUs.jsx`)
 * Title: "MADE FOR EVERY KIND OF SHOPPING DAY."
 * Refined icons, restrained animation, zero unverified claims.
 */
function WhyChooseUs({ pillars }) {
  const iconMap = {
    Users,
    Layers,
    Sparkles,
    ShoppingBag,
    MapPin,
    MessageCircle,
  };

  return (
    <section
      id="why-nath"
      className="py-20 sm:py-28 lg:py-32 bg-[#F8F5EF] text-[#22201F] border-b border-[#B89A62]/25"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <SectionHeader
          eyebrow="THE NATH PROMISE"
          title="MADE FOR EVERY KIND OF SHOPPING DAY."
          subtitle="Whether you are shopping for a milestone family wedding or picking up comfortable daily wear, every detail is designed around ease and warmth."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => {
            const IconComponent = iconMap[pillar.iconName] || Sparkles;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                className="bg-white border border-[#B89A62]/35 p-8 sm:p-9 flex flex-col justify-between hover:border-[#651E2B] transition-colors duration-300"
              >
                <div className="space-y-5">
                  <div className="w-12 h-12 bg-[#651E2B]/10 border border-[#B89A62]/50 flex items-center justify-center text-[#651E2B]">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#22201F] font-medium">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#22201F]/75 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#B89A62]/20 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[#651E2B] font-semibold">
                  <span>NATH • SAUNDALGA</span>
                  <span>0{idx + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * 11. MALL PHOTO GALLERY (`src/components/Gallery.jsx`)
 * Title: "STEP INSIDE THE EXPERIENCE."
 * Uses the real mall photograph for Mall Exterior, reserves obvious architectural
 * placeholders for interior/entrance photos until supplied by the owner, and clearly
 * labels illustrative fashion photography. Includes an accessible keyboard Lightbox.
 */
function Gallery({
  galleryItems,
  heroPhotoUrl,
  heroImageLoaded,
  onUploadHeroPhoto,
  onUploadGallerySlotPhoto,
}) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const slotInputRefs = useRef({});

  const filters = ["All", "Real Store Slots", "Fashion & Shopping Inspiration"];

  const resolvedItems = useMemo(() => {
    return galleryItems.map((item) => {
      if (item.usesHeroPhoto) {
        return {
          ...item,
          resolvedUrl: heroImageLoaded ? heroPhotoUrl : "",
        };
      }
      if (item.isRealMallSlot) {
        return {
          ...item,
          resolvedUrl: item.customPhotoUrl || "",
        };
      }
      return {
        ...item,
        resolvedUrl: item.imageUrl,
      };
    });
  }, [galleryItems, heroPhotoUrl, heroImageLoaded]);

  const filteredGallery = useMemo(() => {
    if (activeFilter === "Real Store Slots") {
      return resolvedItems.filter((i) => i.isRealMallSlot);
    }
    if (activeFilter === "Fashion & Shopping Inspiration") {
      return resolvedItems.filter((i) => !i.isRealMallSlot);
    }
    return resolvedItems;
  }, [resolvedItems, activeFilter]);

  const openLightbox = (idx) => {
    if (filteredGallery[idx]?.resolvedUrl) {
      setLightboxIndex(idx);
    }
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + filteredGallery.length) % filteredGallery.length;
    });
  }, [filteredGallery.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % filteredGallery.length;
    });
  }, [filteredGallery.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  return (
    <section
      id="gallery"
      className="py-20 sm:py-28 lg:py-32 bg-[#F8F5EF] text-[#22201F] border-b border-[#B89A62]/25"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <SectionHeader
            eyebrow="VISUAL ARCHIVE & LOOKBOOK"
            title="STEP INSIDE THE EXPERIENCE."
            subtitle="Explore our real exterior architecture in Saundalga alongside dedicated slots for in-store photography and illustrative seasonal fashion."
          />

          <div className="flex flex-wrap items-center gap-2 pb-4 lg:pb-12">
            {filters.map((filterName) => (
              <button
                key={filterName}
                type="button"
                onClick={() => setActiveFilter(filterName)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.2em] font-semibold border transition-colors ${
                  activeFilter === filterName
                    ? "bg-[#651E2B] text-[#F8F5EF] border-[#651E2B]"
                    : "bg-white text-[#22201F]/80 border-[#B89A62]/40 hover:border-[#651E2B]"
                }`}
              >
                {filterName}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {filteredGallery.map((item, idx) => {
            const hasImage = Boolean(item.resolvedUrl);
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`group relative overflow-hidden border border-[#B89A62]/40 bg-[#22201F] ${item.aspect}`}
              >
                {/* Hidden File Input for Owner Real Store Slots */}
                {item.isRealMallSlot && (
                  <input
                    ref={(el) => {
                      slotInputRefs.current[item.id] = el;
                    }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      if (item.usesHeroPhoto) {
                        onUploadHeroPhoto(file);
                      } else {
                        onUploadGallerySlotPhoto(item.id, file);
                      }
                    }}
                  />
                )}

                {hasImage ? (
                  <div
                    onClick={() => openLightbox(idx)}
                    className="w-full h-full cursor-zoom-in relative"
                  >
                    <img
                      src={item.resolvedUrl}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#22201F]/90 via-[#22201F]/20 to-transparent" />

                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      <span
                        className={`px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold border ${
                          item.isRealMallSlot
                            ? "bg-[#651E2B] text-[#F8F5EF] border-[#B89A62]"
                            : "bg-[#22201F]/80 text-[#B89A62] border-[#B89A62]/40"
                        }`}
                      >
                        {item.isRealMallSlot
                          ? `Verified Store Photo • ${item.category}`
                          : `Illustrative Fashion • ${item.category}`}
                      </span>

                      <span className="p-2 bg-[#22201F]/75 text-[#F8F5EF] border border-[#F8F5EF]/20">
                        <Eye className="w-4 h-4" />
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-serif text-2xl text-[#FFFFFF] mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#F8F5EF]/80 line-clamp-2">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Obvious Placeholder for Real Mall Interior / Entrance Photos (Never Faked) */
                  <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between bg-[radial-gradient(circle_at_top_right,#651E2B_0%,#22201F_85%)] text-[#F8F5EF]">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-[#3B101A] border border-[#B89A62]/50 text-[#B89A62] text-[10px] uppercase tracking-[0.22em] font-semibold">
                        Reserved for Real Photograph • {item.category}
                      </span>
                      <ImageIcon className="w-5 h-5 text-[#B89A62]" />
                    </div>

                    <div className="my-auto py-6 space-y-3">
                      <h3 className="font-serif text-2xl sm:text-3xl text-[#FFFFFF]">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#F8F5EF]/75 leading-relaxed">
                        {item.caption}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => slotInputRefs.current[item.id]?.click()}
                      className="w-full py-3 px-4 bg-[#B89A62] hover:bg-[#c8aa70] text-[#22201F] text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      <span>
                        {item.usesHeroPhoto
                          ? "Load Your Real nath.jpg Exterior"
                          : `Preview Real ${item.category} Photo`}
                      </span>
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredGallery[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#22201F]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image Lightbox"
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 bg-[#3B101A] text-[#F8F5EF] border border-[#B89A62]/50 hover:bg-[#B89A62] hover:text-[#22201F] transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-4 sm:left-8 p-3 bg-[#22201F]/80 text-[#F8F5EF] border border-[#B89A62]/40 hover:bg-[#B89A62] hover:text-[#22201F] transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div
              className="max-w-5xl w-full flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full max-h-[75vh] overflow-hidden border border-[#B89A62]/40 bg-[#141211] flex items-center justify-center">
                <img
                  src={filteredGallery[lightboxIndex].resolvedUrl}
                  alt={filteredGallery[lightboxIndex].title}
                  className="max-h-[75vh] w-auto object-contain"
                />
              </div>
              <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[#F8F5EF] bg-[#22201F] p-4 border border-[#B89A62]/30">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#B89A62]">
                    {filteredGallery[lightboxIndex].isRealMallSlot
                      ? "Actual Store Photograph"
                      : "Illustrative Fashion Editorial"}
                  </p>
                  <h4 className="font-serif text-xl">
                    {filteredGallery[lightboxIndex].title}
                  </h4>
                  <p className="text-xs text-[#F8F5EF]/75 mt-0.5">
                    {filteredGallery[lightboxIndex].caption}
                  </p>
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#B89A62] shrink-0">
                  {lightboxIndex + 1} / {filteredGallery.length}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-4 sm:right-8 p-3 bg-[#22201F]/80 text-[#F8F5EF] border border-[#B89A62]/40 hover:bg-[#B89A62] hover:text-[#22201F] transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/**
 * 12. CUSTOMER EXPERIENCE & REVIEWS (`src/components/CustomerExperience.jsx`)
 * Neutral, honest section about the in-store family experience until verified reviews
 * are added by the owner. Never fabricates reviewer names, ratings, or counts.
 */
function CustomerExperience({ experienceData, onNavigate }) {
  return (
    <section className="py-20 sm:py-24 bg-[#651E2B] text-[#F8F5EF] border-b border-[#B89A62]/35">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block text-xs uppercase tracking-[0.28em] text-[#B89A62] font-semibold">
              {experienceData.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl leading-[1.1] text-[#FFFFFF] font-normal">
              {experienceData.headline}
            </h2>
            <p className="text-base sm:text-lg text-[#F8F5EF]/85 leading-relaxed">
              {experienceData.description}
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#3B101A] border border-[#B89A62]/45 p-8 space-y-5">
              <div className="flex items-center justify-between border-b border-[#B89A62]/25 pb-4">
                <span className="text-[11px] uppercase tracking-[0.22em] text-[#B89A62] font-semibold">
                  CUSTOMER FEEDBACK & GOOGLE MAPS
                </span>
                <ShieldCheck className="w-5 h-5 text-[#B89A62]" />
              </div>

              {experienceData.verifiedReviews &&
              experienceData.verifiedReviews.length > 0 ? (
                <div className="space-y-4">
                  {experienceData.verifiedReviews.map((rev, i) => (
                    <blockquote
                      key={i}
                      className="text-sm text-[#F8F5EF]/90 italic"
                    >
                      “{rev.comment}” —{" "}
                      <span className="not-italic font-semibold">
                        {rev.name}
                      </span>
                    </blockquote>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="font-serif text-xl text-[#FFFFFF]">
                    Designed Around Real Family Visits
                  </p>
                  <p className="text-xs sm:text-sm text-[#F8F5EF]/80 leading-relaxed">
                    We value authentic feedback from families visiting our
                    Saundalga store. Verified customer testimonials and official
                    Google Maps rating highlights can be enabled directly in{" "}
                    {/* <code className="text-[#B89A62]">src/data/mallData.js</code>{" "}
                    upon owner approval. */}
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => onNavigate("visit")}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#B89A62] font-semibold hover:underline"
                    >
                      <span>View Location & Google Maps</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 13. LOCATION & VISIT SECTION (`src/components/Location.jsx`)
 * Title: "NEXT SHOPPING STOP: NATH."
 * Displays verified Saundalga, Karnataka address, responsive Google Maps embed,
 * GET DIRECTIONS button, CONTACT ON WHATSAPP button, and configurable contact slots.
 */
function LocationSection({ mallData, onEnquire }) {
  const { verifiedLocation, contact } = mallData;

  return (
    <section
      id="visit"
      className="py-20 sm:py-28 lg:py-32 bg-[#F8F5EF] text-[#22201F] border-b border-[#B89A62]/25"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <SectionHeader
          eyebrow="PLAN YOUR STORE VISIT"
          title="NEXT SHOPPING STOP: NATH."
          subtitle="Visit NATH Biggest Family Shopping Mall in Saundalga, Karnataka. Use the interactive map below for turn-by-turn directions or message us on WhatsApp before you set out."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Verified Location & Configurable Store Information */}
          <div className="lg:col-span-5 bg-white border border-[#B89A62]/40 p-8 sm:p-10 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#651E2B] font-semibold">
                  VERIFIED STORE ADDRESS
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#22201F] mt-1">
                  {mallData.fullTitle}
                </h3>
                <p className="text-base text-[#22201F]/80 mt-2 flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-[#651E2B] shrink-0 mt-0.5" />
                  <span>{verifiedLocation.formattedAddress}</span>
                </p>
              </div>

              <div className="border-t border-[#B89A62]/25 pt-6 space-y-4">
                <div className="flex items-start gap-3.5">
                  <Phone className="w-4 h-4 text-[#651E2B] shrink-0 mt-1" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#22201F]/60 font-semibold">
                      TELEPHONE (CONFIGURABLE)
                    </p>
                    <p className="text-sm text-[#22201F] font-medium mt-0.5">
                      {contact.whatsappNumber
                        ? `+${contact.whatsappNumber}`
                        : contact.phoneDisplay}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-4 h-4 text-[#651E2B] shrink-0 mt-1" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#22201F]/60 font-semibold">
                      OPENING HOURS (CONFIGURABLE)
                    </p>
                    <p className="text-sm text-[#22201F] font-medium mt-0.5">
                      {contact.openingHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3.5 pt-4 border-t border-[#B89A62]/25">
              <a
                href={verifiedLocation.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 bg-[#651E2B] hover:bg-[#3B101A] text-[#F8F5EF] text-xs uppercase tracking-[0.22em] font-semibold flex items-center justify-center gap-2.5 transition-colors"
              >
                <Compass className="w-4 h-4 text-[#B89A62]" />
                <span>GET DIRECTIONS</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-75" />
              </a>

              <button
                type="button"
                onClick={() =>
                  onEnquire(
                    "Store location, opening hours, and visiting NATH in Saundalga",
                  )
                }
                className="w-full py-4 px-6 bg-white hover:bg-[#651E2B]/5 text-[#651E2B] border border-[#651E2B] text-xs uppercase tracking-[0.22em] font-semibold flex items-center justify-center gap-2.5 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>CONTACT ON WHATSAPP</span>
              </button>
            </div>
          </div>

          {/* Right Column: Responsive Google Maps Iframe */}
          <div className="lg:col-span-7 min-h-[380px] sm:min-h-[460px] bg-[#22201F] border border-[#B89A62]/45 relative overflow-hidden shadow-lg">
            <iframe
              title="Google Maps Location for NATH Biggest Family Shopping Mall, Saundalga, Karnataka"
              src={verifiedLocation.googleMapsEmbedUrl}
              className="w-full h-full min-h-[380px] sm:min-h-[460px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 14. FINAL CONVERSION SECTION & FOOTER (`src/components/FinalCTA.jsx` & `Footer.jsx`)
 */
function FinalCTA({ onNavigate }) {
  return (
    <section className="relative py-24 sm:py-32 lg:py-40 bg-[#22201F] text-[#F8F5EF] overflow-hidden">
      {/* Background High-Fashion Image with Rich Wine Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1800&q=85"
          alt="Happy Family Shopping Inspiration"
          loading="lazy"
          className="w-full h-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#22201F] via-[#3B101A]/90 to-[#22201F]/90" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <span className="inline-block text-xs uppercase tracking-[0.28em] text-[#B89A62] font-semibold">
            NATH BIGGEST FAMILY SHOPPING MALL • SAUNDALGA
          </span>

          <h2 className="font-serif text-4xl sm:text-6xl lg:text-[72px] leading-[1.05] text-[#FFFFFF] font-normal">
            GREAT FINDS.
            <br />
            <span className="italic text-[#B89A62]">HAPPY FAMILIES.</span>
            <br />
            MEMORABLE MOMENTS.
          </h2>

          <p className="text-base sm:text-xl text-[#F8F5EF]/85 max-w-2xl mx-auto leading-relaxed">
            Your next shopping experience starts at NATH BIGGEST FAMILY SHOPPING
            MALL.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate("catalogue")}
              className="w-full sm:w-auto px-9 py-4 bg-[#B89A62] hover:bg-[#c8aa70] text-[#22201F] text-xs uppercase tracking-[0.24em] font-bold flex items-center justify-center gap-3 transition-colors"
            >
              <span>EXPLORE COLLECTIONS</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate("visit")}
              className="w-full sm:w-auto px-9 py-4 bg-transparent hover:bg-[#F8F5EF] text-[#F8F5EF] hover:text-[#22201F] border border-[#F8F5EF]/50 text-xs uppercase tracking-[0.24em] font-semibold flex items-center justify-center gap-3 transition-colors"
            >
              <MapPin className="w-4 h-4 text-[#B89A62]" />
              <span>PLAN YOUR VISIT</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ mallData, onNavigate, onOpenSetupGuide }) {
  return (
    <footer className="bg-[#191716] text-[#F8F5EF] border-t border-[#B89A62]/30">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#F8F5EF]/10">
          {/* Col 1: Brand Wordmark */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <span className="font-serif text-3xl sm:text-4xl tracking-[0.18em] text-[#FFFFFF] font-semibold block">
                NATH
              </span>
              <span className="text-[10px] uppercase tracking-[0.26em] text-[#B89A62] block mt-0.5">
                BIGGEST FAMILY SHOPPING MALL
              </span>
            </div>
            <p className="text-sm text-[#F8F5EF]/70 max-w-sm leading-relaxed">
              Discover a world of style for every generation, every occasion,
              and every special moment in Saundalga, Karnataka.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#B89A62]">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{mallData.verifiedLocation.formattedAddress}</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs uppercase tracking-[0.24em] text-[#B89A62] font-semibold mb-4">
              NAVIGATION
            </p>
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About Us" },
              { id: "categories", label: "Categories" },
              { id: "catalogue", label: "Product Discovery" },
              { id: "collections", label: "Collection Spotlights" },
              { id: "gallery", label: "Mall Gallery" },
              { id: "visit", label: "Visit Us" },
            ].map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => onNavigate(link.id)}
                className="block text-sm text-[#F8F5EF]/75 hover:text-[#B89A62] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Col 3: Contact & Owner Configuration */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[#B89A62] font-semibold mb-4">
              STORE CONTACT & HOURS
            </p>
            <div className="space-y-2 text-sm text-[#F8F5EF]/75">
              <p>
                <strong className="text-[#F8F5EF]">Location:</strong> Saundalga,
                Karnataka, India
              </p>
              <p>
                <strong className="text-[#F8F5EF]">Phone / WhatsApp:</strong>{" "}
                {mallData.contact.whatsappNumber
                  ? `+${mallData.contact.whatsappNumber}`
                  : mallData.contact.phoneDisplay}
              </p>
              <p>
                <strong className="text-[#F8F5EF]">Hours:</strong>{" "}
                {mallData.contact.openingHours}
              </p>
            </div>

            {/* <div className="pt-4">10 am–9 pm
              <button
                type="button"
                onClick={onOpenSetupGuide}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#22201F] hover:bg-[#651E2B] text-[#B89A62] hover:text-[#F8F5EF] border border-[#B89A62]/40 text-[11px] uppercase tracking-[0.18em] transition-colors"
              >
                <Code2 className="w-4 h-4" />
                <span>Developer & Vercel Deployment Info</span>
              </button>
            </div> */}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F8F5EF]/50">
          <p>
            © {new Date().getFullYear()} {mallData.fullTitle}, Saundalga,
            Karnataka. All rights reserved.
          </p>
          <p>
            Crafted for Luxury Indian Retail Discovery & WhatsApp Conversion
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================================
 * 6. MAIN APPLICATION COMPONENT (`src/App.jsx`)
 * ============================================================================ */
export default function App() {
  const [mallData, setMallData] = useState(INITIAL_MALL_DATA);
  const [products] = useState(INITIAL_PRODUCTS);
  const [galleryItems, setGalleryItems] = useState(INITIAL_GALLERY_ITEMS);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Real Mall Photo (`nath.jpg`) State Management
  const [heroPhotoUrl, setHeroPhotoUrl] = useState(
    INITIAL_MALL_DATA.hero.realMallPhotoPath,
  );
  const [triedRelativeFallback, setTriedRelativeFallback] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  // Modals for WhatsApp Enquiry & Developer/Owner Configuration
  const [enquiryModalData, setEnquiryModalData] = useState(null);
  const [ownerStudioOpen, setOwnerStudioOpen] = useState(false);
  const [setupGuideOpen, setSetupGuideOpen] = useState(false);
  const studioFileInputRef = useRef(null);

  // Set SEO Document Title & Meta Description
  useEffect(() => {
    document.title =
      "NATH Biggest Family Shopping Mall | Saundalga, Karnataka — Family Fashion Destination";
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const sectionIds = [
      "home",
      "about",
      "categories",
      "catalogue",
      "collections",
      "gallery",
      "visit",
    ];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 240;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle automatic fallback check between `/nath.jpg` and `nath.jpg`
  const handleHeroImageLoad = () => {
    setHeroImageLoaded(true);
  };

  const handleHeroImageError = () => {
    if (!triedRelativeFallback) {
      setTriedRelativeFallback(true);
      setHeroPhotoUrl(INITIAL_MALL_DATA.hero.fallbackRelativePath);
    } else {
      setHeroImageLoaded(false);
    }
  };

  // Allow owner to select their local `nath.jpg` file for instant live preview
  const handleUploadRealPhoto = (file) => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setHeroPhotoUrl(objectUrl);
    setHeroImageLoaded(true);
  };

  const handleUploadGallerySlotPhoto = (slotId, file) => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setGalleryItems((prev) =>
      prev.map((item) =>
        item.id === slotId ? { ...item, customPhotoUrl: objectUrl } : item,
      ),
    );
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  const handleSelectCategoryAndScroll = (categoryName) => {
    setSelectedCategory(categoryName);
    scrollToSection("catalogue");
  };

  const handleTriggerWhatsAppEnquiry = (itemOrTopic) => {
    const url = buildWhatsAppUrl(mallData.contact.whatsappNumber, itemOrTopic);
    const messagePreview = `Hello NATH BIGGEST FAMILY SHOPPING MALL, I would like to enquire about ${itemOrTopic}. Please share the price and availability.`;
    setEnquiryModalData({
      topic: itemOrTopic,
      messagePreview,
      whatsappUrl: url,
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#22201F] font-sans selection:bg-[#651E2B] selection:text-[#F8F5EF] overflow-x-hidden">
      {/* Google Fonts Injection for Cormorant Garamond & Plus Jakarta Sans */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        .font-serif {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }
        .font-sans {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }
      `}</style>

      {/* 1. PREMIUM NAVIGATION */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenEnquiry={handleTriggerWhatsAppEnquiry}
      />

      {/* 2. HERO SECTION (Centrepiece: Owner's Real `nath.jpg` Mall Photograph) */}
      <main>
        <Hero
          mallData={mallData}
          heroPhotoUrl={heroPhotoUrl}
          heroImageLoaded={heroImageLoaded}
          onHeroImageLoad={handleHeroImageLoad}
          onHeroImageError={handleHeroImageError}
          onUploadRealPhoto={handleUploadRealPhoto}
          onNavigate={scrollToSection}
        />

        {/* 3. EDITORIAL INTRODUCTION */}
        <Introduction mallData={mallData} onNavigate={scrollToSection} />

        {/* 4. SHOP BY CATEGORY */}
        <Categories
          categories={mallData.categories}
          onSelectCategory={handleSelectCategoryAndScroll}
        />

        {/* 5. VISUAL PRODUCT DISCOVERY */}
        <ProductCatalogue
          products={products}
          categories={mallData.categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onEnquireProduct={handleTriggerWhatsAppEnquiry}
        />

        {/* 6. PREMIUM COLLECTION SPOTLIGHTS */}
        <CollectionSpotlights
          spotlights={mallData.spotlights}
          onSelectCategory={handleSelectCategoryAndScroll}
          onEnquire={handleTriggerWhatsAppEnquiry}
        />

        {/* 7. SPECIAL OFFERS SECTION */}
        <Offers
          offersConfig={mallData.offers}
          onNavigate={scrollToSection}
          onEnquire={handleTriggerWhatsAppEnquiry}
        />

        {/* 8. WHY SHOP WITH NATH? */}
        <WhyChooseUs pillars={mallData.whyShopPillars} />

        {/* 9. MALL PHOTO GALLERY */}
        <Gallery
          galleryItems={galleryItems}
          heroPhotoUrl={heroPhotoUrl}
          heroImageLoaded={heroImageLoaded}
          onUploadHeroPhoto={handleUploadRealPhoto}
          onUploadGallerySlotPhoto={handleUploadGallerySlotPhoto}
        />

        {/* 10. CUSTOMER EXPERIENCE & REVIEWS */}
        <CustomerExperience
          experienceData={mallData.customerExperience}
          onNavigate={scrollToSection}
        />

        {/* 11. LOCATION & VISIT SECTION */}
        <LocationSection
          mallData={mallData}
          onEnquire={handleTriggerWhatsAppEnquiry}
        />

        {/* 12. FINAL CONVERSION SECTION */}
        <FinalCTA onNavigate={scrollToSection} />
      </main>

      {/* 13. POLISHED FOOTER */}
      <Footer
        mallData={mallData}
        onNavigate={scrollToSection}
        onOpenSetupGuide={() => setSetupGuideOpen(true)}
      />

      {/* ======================================================================
       * FLOATING OWNER PREVIEW STUDIO BAR (Bottom-Left)
       * Lets the owner load `nath.jpg` anytime, test their WhatsApp number,
       * or toggle a sample verified offer without touching code.
       * ====================================================================== */}
      {/* <div className="fixed bottom-4 left-4 z-40">
        <input
          ref={studioFileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUploadRealPhoto(file);
          }}
        />
        {ownerStudioOpen ? (
          <div className="bg-[#22201F] text-[#F8F5EF] border border-[#B89A62] p-5 w-80 sm:w-96 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#B89A62]/30 pb-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#B89A62] font-semibold">
                  OWNER CUSTOMIZATION STUDIO
                </p>
                <p className="font-serif text-lg">Live Store Configuration</p>
              </div>
              <button
                type="button"
                onClick={() => setOwnerStudioOpen(false)}
                className="p-1 text-[#F8F5EF]/70 hover:text-[#B89A62]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.18em] text-[#B89A62] mb-1">
                  1. Real Hero & Exterior Photo (nath.jpg)
                </label>
                <button
                  type="button"
                  onClick={() => studioFileInputRef.current?.click()}
                  className="w-full py-2.5 px-3 bg-[#651E2B] hover:bg-[#3B101A] border border-[#B89A62]/50 text-[#F8F5EF] font-semibold uppercase tracking-[0.16em] flex items-center justify-center gap-2"
                >
                  <Upload className="w-3.5 h-3.5 text-[#B89A62]" />
                  <span>
                    {heroImageLoaded
                      ? "Replace nath.jpg Photo"
                      : "Load Your nath.jpg Now"}
                  </span>
                </button>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.18em] text-[#B89A62] mb-1">
                  2. Store WhatsApp Number (with country code)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 919876543210"
                  value={mallData.contact.whatsappNumber}
                  onChange={(e) =>
                    setMallData((prev) => ({
                      ...prev,
                      contact: {
                        ...prev.contact,
                        whatsappNumber: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-3 py-2 bg-[#161413] border border-[#B89A62]/40 text-[#F8F5EF] text-xs focus:outline-none focus:border-[#B89A62]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.18em] text-[#B89A62] mb-1">
                  3. Store Opening Hours
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mon – Sun: 9:30 AM – 9:30 PM"
                  value={mallData.contact.openingHours}
                  onChange={(e) =>
                    setMallData((prev) => ({
                      ...prev,
                      contact: {
                        ...prev.contact,
                        openingHours: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-3 py-2 bg-[#161413] border border-[#B89A62]/40 text-[#F8F5EF] text-xs focus:outline-none focus:border-[#B89A62]"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOwnerStudioOpen(true)}
              className="px-4 py-2.5 bg-[#22201F]/90 backdrop-blur-md hover:bg-[#651E2B] text-[#F8F5EF] border border-[#B89A62]/60 text-[11px] uppercase tracking-[0.18em] font-semibold flex items-center gap-2 shadow-xl transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-[#B89A62]" />
              <span>Owner Studio & Photo Loader</span>
            </button>
          </div>
        )}
      </div> */}

      {/* ======================================================================
       * WHATSAPP ENQUIRY MODAL
       * Shows the prefilled contextual message and opens WhatsApp directly.
       * ====================================================================== */}
      <AnimatePresence>
        {enquiryModalData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#22201F]/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setEnquiryModalData(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="bg-[#F8F5EF] text-[#22201F] border border-[#B89A62] max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-[#B89A62]/30 pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[#651E2B] font-semibold">
                    DIRECT WHATSAPP ENQUIRY
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#22201F] mt-1">
                    Enquire with NATH
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setEnquiryModalData(null)}
                  className="p-1.5 text-[#22201F]/60 hover:text-[#651E2B]"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.18em] text-[#22201F]/60 font-semibold">
                  Prefilled Enquiry Message:
                </p>
                <div className="p-4 bg-white border border-[#B89A62]/40 text-sm text-[#22201F] italic leading-relaxed">
                  “{enquiryModalData.messagePreview}”
                </div>
              </div>

              {!mallData.contact.whatsappNumber && (
                <div className="p-3.5 bg-[#B89A62]/15 border border-[#B89A62]/50 text-xs text-[#22201F]/85 space-y-2">
                  <p className="font-semibold text-[#651E2B]">
                    Owner Note — Configurable WhatsApp Number:
                  </p>
                  <p>
                    No phone number was fabricated. You can enter the store’s
                    official WhatsApp number below (or in{" "}
                    <code className="font-mono">mallData.js</code>) to route
                    directly to your store phone:
                  </p>
                  <input
                    type="text"
                    placeholder="Optional: Enter WhatsApp number (e.g. 919876543210)"
                    value={mallData.contact.whatsappNumber}
                    onChange={(e) => {
                      const val = e.target.value;
                      setMallData((prev) => ({
                        ...prev,
                        contact: { ...prev.contact, whatsappNumber: val },
                      }));
                      setEnquiryModalData((prev) => ({
                        ...prev,
                        whatsappUrl: buildWhatsAppUrl(val, prev.topic),
                      }));
                    }}
                    className="w-full px-3 py-2 bg-white border border-[#B89A62] text-xs"
                  />
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <a
                  href={enquiryModalData.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setEnquiryModalData(null)}
                  className="w-full py-4 px-6 bg-[#651E2B] hover:bg-[#3B101A] text-[#F8F5EF] text-xs uppercase tracking-[0.22em] font-semibold flex items-center justify-center gap-2.5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#B89A62]" />
                  <span>OPEN IN WHATSAPP</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================================
       * DEVELOPER & VERCEL DEPLOYMENT INSTRUCTIONS MODAL
       * ====================================================================== */}
      <AnimatePresence>
        {setupGuideOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#22201F]/85 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSetupGuideOpen(false)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="bg-[#F8F5EF] text-[#22201F] border border-[#B89A62] max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between border-b border-[#B89A62]/30 pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[#651E2B] font-semibold">
                    PRODUCTION HANDOFF & VERCEL DEPLOYMENT
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl mt-1">
                    Project Setup & Deployment Guide
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSetupGuideOpen(false)}
                  className="p-1.5 text-[#22201F]/60 hover:text-[#651E2B]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
                <div>
                  <h4 className="font-semibold uppercase tracking-[0.18em] text-[#651E2B] text-xs mb-1">
                    1. Place Your Real Mall Photograph (nath.jpg)
                  </h4>
                  <p className="text-[#22201F]/80">
                    Copy your uploaded photograph{" "}
                    <code className="font-mono">nath.jpg</code> into the{" "}
                    <code className="font-mono">public/nath.jpg</code> directory
                    of your Vite project. The Hero section and Mall Exterior
                    gallery automatically load{" "}
                    <code className="font-mono">/nath.jpg</code>.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold uppercase tracking-[0.18em] text-[#651E2B] text-xs mb-1">
                    2. Local Installation & Development
                  </h4>
                  <pre className="p-3 bg-[#22201F] text-[#F8F5EF] font-mono text-xs overflow-x-auto">
                    {`npm install framer-motion lucide-react
npm run dev`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-semibold uppercase tracking-[0.18em] text-[#651E2B] text-xs mb-1">
                    3. Deploying to Vercel
                  </h4>
                  <p className="text-[#22201F]/80">
                    Push the repository to GitHub/GitLab and import into Vercel
                    with Framework Preset set to <strong>Vite</strong>, Build
                    Command <code className="font-mono">npm run build</code>,
                    and Output Directory <code className="font-mono">dist</code>
                    .
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
