
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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'body': ['Source Sans Pro', 'system-ui', 'sans-serif'],
				'heading': ['Crimson Text', 'Georgia', 'serif'],
				'mono': ['ui-monospace', 'SFMono-Regular', 'monospace'],
			},
			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
				'sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
				'base': ['1rem', { lineHeight: '1.7', letterSpacing: '-0.01em' }],
				'lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '-0.01em' }],
				'xl': ['1.25rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
				'2xl': ['1.5rem', { lineHeight: '1.5', letterSpacing: '-0.02em' }],
				'3xl': ['1.875rem', { lineHeight: '1.4', letterSpacing: '-0.02em' }],
				'4xl': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.03em' }],
				'5xl': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.03em' }],
				'6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.04em' }],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'neural-pulse': {
					'0%, 100%': { 
						boxShadow: '0 0 0 0 hsl(var(--primary) / 0.3)',
						transform: 'scale(1)'
					},
					'50%': { 
						boxShadow: '0 0 0 6px hsl(var(--primary) / 0)',
						transform: 'scale(1.01)'
					}
				},
				'predictive-emerge': {
					'0%': { 
						opacity: '0', 
						transform: 'scale(0.96) translateY(8px)',
						filter: 'blur(1px)'
					},
					'100%': { 
						opacity: '1', 
						transform: 'scale(1) translateY(0)',
						filter: 'blur(0px)'
					}
				},
				'gentle-float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'50%': { transform: 'translateY(-8px) rotate(0.5deg)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				'scale-in': {
					'0%': { 
						opacity: '0', 
						transform: 'scale(0.95)',
					},
					'100%': { 
						opacity: '1', 
						transform: 'scale(1)',
					}
				},
				'context-awareness': {
					'0%': { opacity: '0.3' },
					'50%': { opacity: '0.8' },
					'100%': { opacity: '0.5' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'neural-pulse': 'neural-pulse 3s ease-in-out infinite',
				'predictive-emerge': 'predictive-emerge 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
				'gentle-float': 'gentle-float 8s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'scale-in': 'scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
				'context-awareness': 'context-awareness 4s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
