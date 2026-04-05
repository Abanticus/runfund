declare const config: {
    darkMode: ["class"];
    content: string[];
    theme: {
        extend: {
            borderRadius: {
                lg: string;
                md: string;
                sm: string;
            };
            colors: {
                background: string;
                foreground: string;
                card: {
                    DEFAULT: string;
                    foreground: string;
                };
                popover: {
                    DEFAULT: string;
                    foreground: string;
                };
                primary: {
                    DEFAULT: string;
                    foreground: string;
                };
                secondary: {
                    DEFAULT: string;
                    foreground: string;
                };
                muted: {
                    DEFAULT: string;
                    foreground: string;
                };
                accent: {
                    DEFAULT: string;
                    foreground: string;
                };
                destructive: {
                    DEFAULT: string;
                    foreground: string;
                };
                border: string;
                input: string;
                ring: string;
            };
            keyframes: {
                "rise-in": {
                    "0%": {
                        opacity: string;
                        transform: string;
                    };
                    "100%": {
                        opacity: string;
                        transform: string;
                    };
                };
            };
            animation: {
                "rise-in": string;
            };
            boxShadow: {
                glow: string;
            };
            fontFamily: {
                body: [string, string, string, string];
                display: [string, string, string, string];
            };
        };
    };
    plugins: {
        handler: () => void;
    }[];
};
export default config;
