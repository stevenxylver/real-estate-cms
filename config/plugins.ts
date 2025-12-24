module.exports = ({ env }) => {
    // Use Cloudinary only if credentials are configured (production)
    // Otherwise use local storage (development)
    const cloudinaryName = env('CLOUDINARY_NAME', '');
    const cloudinaryKey = env('CLOUDINARY_KEY', '');
    const cloudinarySecret = env('CLOUDINARY_SECRET', '');

    if (cloudinaryName && cloudinaryKey && cloudinarySecret) {
        return {
            upload: {
                config: {
                    provider: 'cloudinary',
                    providerOptions: {
                        cloud_name: cloudinaryName,
                        api_key: cloudinaryKey,
                        api_secret: cloudinarySecret,
                    },
                    actionOptions: {
                        upload: {
                            resource_type: 'auto',
                        },
                        delete: {},
                    },
                },
            },
        };
    }

    // Default: use local storage for development
    return {};
};