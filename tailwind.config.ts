import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: 'var(--container-padding)',
			screens: {
				'2xl': '1600px'
			}
		},
		extend: {
			fontFamily: {
				'neue': ['Neue Montreal', 'system-ui', 'sans-serif'],
				'suisse': ['Suisse Intl', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				
				surface: {
					DEFAULT: 'hsl(var(--surface))',
					muted: 'hsl(var(--surface-muted))',
					elevated: 'hsl(var(--surface-elevated))',
				},
				
				beige: {
					DEFAULT: 'hsl(var(--beige))',
					dark: 'hsl(var(--beige-dark))',
				},
				'warm-white': 'hsl(var(--warm-white))',
				stone: 'hsl(var(--stone))',
				
				gold: 'hsl(var(--gold))',
				bronze: 'hsl(var(--bronze))',
				silver: 'hsl(var(--silver))',
				
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			transitionTimingFunction: {
				'luxury': 'var(--ease-luxury)',
				'smooth': 'var(--ease-smooth)',
				'bounce': 'var(--ease-bounce)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-up': {
					from: { 
						opacity: '0', 
						transform: 'translateY(2rem)' 
					},
					to: { 
						opacity: '1', 
						transform: 'translateY(0)' 
					}
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'scale-in': {
					from: { 
						opacity: '0', 
						transform: 'scale(0.95)' 
					},
					to: { 
						opacity: '1', 
						transform: 'scale(1)' 
					}
				},
				'shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'logo-float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'50%': { transform: 'translateY(-10px) rotate(1deg)' }
				},
				'slide-up': {
					from: { 
						opacity: '0', 
						transform: 'translateY(100%)' 
					},
					to: { 
						opacity: '1', 
						transform: 'translateY(0)' 
					}
				},
				'reveal': {
					from: { 
						opacity: '0',
						clipPath: 'inset(0 100% 0 0)'
					},
					to: { 
						opacity: '1',
						clipPath: 'inset(0 0% 0 0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-up': 'fade-up 1s var(--ease-luxury) forwards',
				'fade-in': 'fade-in 1.5s var(--ease-smooth) forwards',
				'scale-in': 'scale-in 1s var(--ease-luxury) forwards',
				'shimmer': 'shimmer 2s infinite',
				'logo-float': 'logo-float 3s ease-in-out infinite',
				'slide-up': 'slide-up 0.8s var(--ease-luxury) forwards',
				'reveal': 'reveal 1.2s var(--ease-luxury) forwards',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
