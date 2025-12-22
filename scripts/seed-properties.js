'use strict';

const mockProperties = [
    {
        title: "Botanica Bellisa",
        slug: "botanica-bellisa",
        price_start: 4500000000,
        bedrooms: 4,
        bathrooms: 3,
        location: "BSD City, Tangerang",
        status_sale: "For Sale",
    },
    {
        title: "Discovery Riviera",
        slug: "discovery-riviera",
        price_start: 4800000000,
        bedrooms: 4,
        bathrooms: 3,
        location: "BSD City, Tangerang",
        status_sale: "For Sale",
    },
    {
        title: "Aura at Discovery Flamingo",
        slug: "aura-discovery-flamingo",
        price_start: 5200000000,
        bedrooms: 5,
        bathrooms: 4,
        location: "BSD City, Tangerang",
        status_sale: "For Sale",
    },
    {
        title: "Vista at Discovery Aluvia",
        slug: "vista-discovery-aluvia",
        price_start: 4300000000,
        bedrooms: 4,
        bathrooms: 3,
        location: "BSD City, Tangerang",
        status_sale: "For Sale",
    },
    {
        title: "Discovery Azzura",
        slug: "discovery-azzura",
        price_start: 4600000000,
        bedrooms: 4,
        bathrooms: 3,
        location: "BSD City, Tangerang",
        status_sale: "For Sale",
    },
    {
        title: "Botanica Aralia",
        slug: "botanica-aralia",
        price_start: 4900000000,
        bedrooms: 5,
        bathrooms: 4,
        location: "BSD City, Tangerang",
        status_sale: "For Sale",
    },
    {
        title: "Navia at Kebayoran Piazza",
        slug: "navia-kebayoran-piazza",
        price_start: 7500000000,
        bedrooms: 5,
        bathrooms: 4,
        location: "Kebayoran, Jakarta Selatan",
        status_sale: "For Sale",
    },
    {
        title: "Nordic at Kebayoran Harmony",
        slug: "nordic-kebayoran-harmony",
        price_start: 7200000000,
        bedrooms: 5,
        bathrooms: 4,
        location: "Kebayoran, Jakarta Selatan",
        status_sale: "For Sale",
    },
    {
        title: "Wichita at Bukit Menteng",
        slug: "wichita-bukit-menteng",
        price_start: 6800000000,
        bedrooms: 4,
        bathrooms: 4,
        location: "Menteng, Jakarta Pusat",
        status_sale: "For Sale",
    },
    {
        title: "Dharmawangsa Home",
        slug: "dharmawangsa-home",
        price_start: 12000000000,
        bedrooms: 6,
        bathrooms: 5,
        location: "Dharmawangsa, Jakarta Selatan",
        status_sale: "For Sale",
    },
    {
        title: "Maika at Discovery Aluvia",
        slug: "maika-discovery-aluvia",
        price_start: 4100000000,
        bedrooms: 3,
        bathrooms: 3,
        location: "BSD City, Tangerang",
        status_sale: "For Sale",
    },
    {
        title: "Discovery Alton",
        slug: "discovery-alton",
        price_start: 4400000000,
        bedrooms: 4,
        bathrooms: 3,
        location: "BSD City, Tangerang",
        status_sale: "For Sale",
    },
    {
        title: "Discovery Alezza",
        slug: "discovery-alezza",
        price_start: 4700000000,
        bedrooms: 4,
        bathrooms: 3,
        location: "BSD City, Tangerang",
        status_sale: "For Sale",
    },
    {
        title: "Decco at Kebayoran Harmony",
        slug: "decco-kebayoran-harmony",
        price_start: 7000000000,
        bedrooms: 5,
        bathrooms: 4,
        location: "Kebayoran, Jakarta Selatan",
        status_sale: "For Sale",
    },
    {
        title: "Kebayoran Piazza",
        slug: "kebayoran-piazza",
        price_start: 8000000000,
        bedrooms: 5,
        bathrooms: 4,
        location: "Kebayoran, Jakarta Selatan",
        status_sale: "For Sale",
    },
];


async function seedProperties() {
    console.log('Starting property seed...');

    for (const property of mockProperties) {
        try {
            // Check if property already exists
            const existing = await strapi.documents('api::property.property').findMany({
                filters: { slug: property.slug },
            });

            if (existing.length > 0) {
                console.log(`Property "${property.title}" already exists, skipping...`);
                continue;
            }

            // Create the property using Strapi Documents API
            const created = await strapi.documents('api::property.property').create({
                data: property,
                status: 'published',
            });

            console.log(`Created property: ${property.title} (ID: ${created.documentId})`);
        } catch (error) {
            console.error(`Error creating property "${property.title}":`, error.message);
        }
    }

    console.log('Property seed completed!');
}

async function main() {
    const { createStrapi, compileStrapi } = require('@strapi/strapi');

    const appContext = await compileStrapi();
    const app = await createStrapi(appContext).load();

    app.log.level = 'error';

    await seedProperties();
    await app.destroy();

    process.exit(0);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
