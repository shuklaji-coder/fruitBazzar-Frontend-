# Premium Animated Home Page - FreshKart

A production-ready, premium animated home page built for the FreshKart fruit & vegetable ordering application.

## 🎨 Design Features

### Color Palette
- **Primary Green**: `#10b981` - Fresh, modern grocery aesthetic
- **Dark Green**: `#059669` - Accent and hover states
- **Light Green**: `#ecfdf5` - Background accents
- **Dark Text**: `#1f2937` - Primary text
- **Light Gray**: `#6b7280` - Secondary text
- **White**: `#ffffff` - Clean backgrounds

### Typography
- **Font Family**: Inter, system fonts
- **Headings**: Bold (700-800 weight), up to 4rem on desktop
- **Body**: Regular weight, 0.95-1.25rem sizes
- **Line Height**: 1.4-1.6 for readability

## 📦 Installation & Setup

### 1. Install Framer Motion
Framer Motion has been added to `package.json`. Install dependencies:
```bash
npm install
```

### 2. File Structure
```
src/
├── pages/
│   └── Home/
│       ├── AnimatedHome.jsx      # Main home page component
│       └── AnimatedHome.css       # Home page styles
├── components/
│   ├── AnimatedNavbar.jsx         # Sticky navbar with animations
│   ├── AnimatedNavbar.css         # Navbar styles
│   ├── AnimatedFooter.jsx         # Footer with animations
│   ├── AnimatedFooter.css         # Footer styles
│   └── sections/
│       ├── HeroSection.jsx        # Hero with headline and CTA
│       ├── HeroSection.css
│       ├── CategoriesSection.jsx  # Category cards
│       ├── CategoriesSection.css
│       ├── ProductsSection.jsx    # Product grid
│       ├── ProductsSection.css
│       ├── WhyChooseUs.jsx        # Features showcase
│       ├── WhyChooseUs.css
│       ├── TrustSection.jsx       # Trust badges
│       ├── TrustSection.css
│       └── index.js               # Section exports
```

## 🎬 Component Overview

### 1. **AnimatedNavbar**
- **Features**:
  - Fixed positioning with blur backdrop
  - Smooth scroll-triggered background change
  - Animated cart badge with item count
  - Dropdown menus for cart and profile
  - Responsive mobile menu
  - Hover animations on all interactive elements

- **Key Animations**:
  - Slide down entrance
  - Scale animations on hover
  - Spring-based badge animations
  - Smooth dropdown transitions

### 2. **HeroSection**
- **Features**:
  - Large, bold headline with gradient text
  - Subheading with trust signals
  - Dual CTA buttons (primary + secondary)
  - Parallax floating image
  - Responsive grid layout

- **Key Animations**:
  - Fade + slide text entrance
  - Staggered button animations
  - Continuous floating image animation
  - Shimmer effect on hero image

### 3. **CategoriesSection**
- **Features**:
  - 4 category cards with icons
  - Color-coded icons (red, green, teal, orange)
  - Hover scale animations
  - Clickable category selection
  - Mobile-responsive grid

- **Key Animations**:
  - Icon container scale & rotate
  - Card elevation on hover
  - Staggered entrance
  - Arrow animation on hover

### 4. **ProductsSection**
- **Features**:
  - Product grid (8 items from store context)
  - Product image with hover zoom
  - Rating display (4.8 stars)
  - Price with strikethrough original
  - Discount badge
  - "Quick Add" button

- **Key Animations**:
  - Image zoom on card hover
  - Card elevation & shadow
  - Discount badge scale-in
  - Button scale on hover
  - Grid stagger animation

### 5. **WhyChooseUs**
- **Features**:
  - 4 feature cards with emojis
  - Icon animations on scroll
  - Hover effects with background glow
  - Animated underline on each card

- **Key Animations**:
  - Icon scale + rotate entrance
  - Icon scale on hover
  - Card background glow expansion
  - Underline width animation

### 6. **TrustSection**
- **Features**:
  - Trust badges (security, quality, delivery, price)
  - Razorpay integration mention
  - Minimal, clean design
  - Responsive badge layout

- **Key Animations**:
  - Badge scale on entrance
  - Hover scale + elevation
  - Staggered badge entrance

### 7. **AnimatedFooter**
- **Features**:
  - Brand info with app coming soon
  - Quick links section
  - Customer care section
  - Contact information
  - Social media links
  - Copyright section

- **Key Animations**:
  - Section fade + slide entrance
  - Link hover with color change & slide
  - Social icon hover scale + color
  - Border glow on top

## 🎭 Animation Philosophy

All animations follow these principles:

1. **Subtle & Smooth**: Animations enhance UX without distracting
2. **Performance-Friendly**: Uses transform and opacity for 60fps
3. **Intentional Timing**: Each animation has purpose and natural easing
4. **Entrance Animations**: Elements animate in on page load/scroll view
5. **Interaction Feedback**: Hover/click states provide visual feedback

### Common Easing Functions Used
- `easeOut`: Text and button entrances
- `easeInOut`: Floating and continuous animations
- `spring`: Badge and scale animations for bounciness

## 🔄 Scroll-Triggered Animations

Most sections use `whileInView` from Framer Motion to trigger animations when scrolling into viewport:

```jsx
initial="hidden"
whileInView="visible"
viewport={{ once: true }}
```

This ensures smooth, staggered animations as users scroll down.

## 📱 Responsive Design

All components are mobile-first with breakpoints at:
- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

Animations are simplified on mobile for performance.

## 🚀 Performance Optimizations

1. **Hardware Acceleration**: Uses `transform` and `opacity` only
2. **Lazy Loading**: Images load on demand
3. **Viewport Triggers**: Animations only calculate when in view
4. **Reduced Motion**: Respects `prefers-reduced-motion` media query
5. **Mobile Optimization**: Simplified animations on smaller screens

## 🎯 SEO & Accessibility

- Semantic HTML structure with `<section>` and `<main>`
- ARIA labels on interactive elements
- Proper heading hierarchy (h1-h4)
- Image alt text for all visual content
- Color contrast meets WCAG AA standards
- Keyboard navigation support

## 🔧 Customization

### Changing Colors
Edit color variables in `AnimatedHome.css`:
```css
:root {
  --primary-green: #10b981;
  --primary-dark: #059669;
  /* ... other variables */
}
```

### Adjusting Animation Speed
Modify transition durations in component variants:
```jsx
transition: { duration: 0.8, ease: 'easeOut' }
```

### Editing Categories
Update the categories array in `CategoriesSection.jsx`:
```jsx
const categories = [
  {
    id: 1,
    name: 'Category Name',
    icon: '🎯',
    color: '#color',
    description: 'Description',
  },
  // ...
];
```

## 🔌 Integration Points

### Connected to Store Context
- Uses `StoreContext` for cart items and product data
- `getCartCount()` for cart badge
- `fruits` array for product grid
- `addToCart()` for add to cart functionality

### Navigation
- Uses React Router for navigation
- Links to `/explore`, `/login`, `/cart` routes
- Protected routes for authenticated users

## 📊 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## 🎓 Key Technologies

- **React 19.2**: Functional components, hooks
- **Framer Motion 11**: Animation library
- **CSS3**: Grid, Flexbox, gradients
- **React Router 7**: Client-side routing
- **Context API**: State management

## 📝 Notes

- The home page replaces the previous `/` route
- Old Home component is still available at `/pages/ExploreFruit/Home.jsx`
- All other routes (explore, cart, etc.) remain unchanged
- Navbar and Footer are custom animated versions, not Bootstrap-based

## 🐛 Troubleshooting

**Animations not playing?**
- Ensure Framer Motion is installed: `npm list framer-motion`
- Check browser support for CSS animations
- Verify `initial`, `animate`, and `transition` props are set

**Layout shifts on scroll?**
- This is normal for scroll-triggered animations
- Use `viewport={{ once: true }}` to prevent re-triggering

**Performance issues on mobile?**
- Reduce animation complexity in mobile breakpoints
- Use `will-change: transform` sparingly
- Test on actual devices, not just browser emulation

## 📞 Support

For issues or customization requests, refer to:
- Framer Motion docs: https://www.framer.com/motion/
- React Router docs: https://reactrouter.com/
- Tailwind CSS (if using): https://tailwindcss.com/

---

**Built with ❤️ for FreshKart**
