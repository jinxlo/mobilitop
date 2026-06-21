# Product Requirements Document

## Summary

Mobili Top needs a production-ready Spanish catalog website for sleep products. The website should feel premium, load quickly, work especially well on mobile, guide customers to the right product, and drive WhatsApp conversations.

## Goals

- Present Mobili Top as a trustworthy sleep-products store/catalog.
- Make product discovery easy by category, brand, promotions, and filters.
- Convert visitors with persistent WhatsApp CTAs and prefilled messages.
- Provide an admin surface for catalog and site content management.
- Be deployable with documented environment variables and Docker/VPS instructions.

## Non-Goals

- Online checkout/payment processing in this version.
- Real-time inventory sync with external ERP.
- Multi-tenant billing/subscription features.
- Final legal policy drafting without human confirmation.

## Users / Personas

- Mobile shopper comparing mattress sizes and prices.
- Customer who needs advice before choosing firmness/material.
- Store/admin operator maintaining products, brands, categories, FAQs, slides, and leads.
- AI/Nulu consumer reading JSON catalog APIs.

## Required Pages / Features

- Home with strong hero, categories, featured products, buying guide, benefits, trust, promotions, FAQs, payment methods, WhatsApp CTA.
- Product catalog with filters and pagination.
- Product detail with gallery, features/materials/warranty/care info, related products, WhatsApp CTA.
- Category, brand, promotions, about, warranty, and contact pages.
- Admin login/dashboard and CRUD surfaces already present.
- SEO metadata, sitemap, robots, manifest.
- Mobile app-like shell and desktop website layout.

## Acceptance Criteria

- [ ] Home page is production quality on mobile and desktop.
- [ ] Catalog/product pages render with seeded or database products.
- [ ] WhatsApp links are present and contextual.
- [ ] Empty states exist when products/promos are missing.
- [ ] Build command succeeds.
- [ ] Lint/type errors are fixed or documented.
- [ ] Deployment docs and runbook are present.
- [ ] AI development team template is installed in the repo.

## Open Questions

- [ ] What is the real production domain?
- [ ] What real WhatsApp number and store address should be used?
- [ ] Are the product prices/seed data final or demo-only?

## Configurator Feature

The site now includes a fabricator-oriented configurator for custom furniture.

User can:

- choose product type: sofa, base, headboard, mattress, ottoman, or advisory path;
- choose model, size, fabric, color, legs/base, extras, delivery, budget, and notes;
- see a live 2D preview with selected color;
- send the full design summary by WhatsApp for a quote.

Acceptance criteria:

- `/configurador` exists.
- Mobile-first flow works without login.
- WhatsApp message includes all selected options.
- UI communicates that final price and fabrication time are confirmed by sales.
- Homepage and navigation expose the configurator.
