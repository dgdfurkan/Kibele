erensukibeleyarman.com bu websitesinin sahibi için bir workplace görevi gören web hazırlayacağız. Bu websitesinde sanatçımız geçmişte yaptığı işleri düzen içerisinde görebilecek ve aylar geçse bile basit arama kelimeleriyle yaptığı işin tüm detaylarına ulaşabilecek. Örnek vermem gerekirse o projede metinlerde kullandığı fontları öğrenmek istediğinde projenin ismini yazıp font yazdığında tüm bilgiler karşısına gelecek. Bu webin arayüz görünümü için ise endless bir tema düşünüyoruz. Sanatçısın websitesindeki tüm işlerden ilham alabilirsin. Projelerin herbirini kolaj şeklinde görebilecek. Zoom yaptığında projenin detaylarına yaklaşacak. Endeless ekran için örnek alabileceğin uygulama PureRef olabilir. Kullanıcı yeni bir proje eklemek istediği zaman amele gibi tek tek bilgileri girmek yerine bir pdf yükleyerek pdften gelen verilerin otomatik doldurulması gerekiyor. Bu UI o kadar tatlı gözüksün ve sanatçının tarzına yakın olsun ki, bu süreçte verileri doldururken onu en az tıklamayla yapabilsin aynı zamanda güzel ve ferah bir alan olsun.







<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Infinite Workspace Canvas</title>
<!-- Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Theme Config -->
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#3c6b7c",
                        "background-light": "#fafaf9",
                        "background-dark": "#1c1f21",
                    },
                    fontFamily: {
                        "display": ["Plus Jakarta Sans", "sans-serif"]
                    },
                    borderRadius: {"DEFAULT": "0.5rem", "lg": "1rem", "xl": "1.5rem", "full": "9999px"},
                    animation: {
                        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
                    },
                    keyframes: {
                        fadeInUp: {
                            '0%': { opacity: '0', transform: 'translateY(10px) translateX(-50%)' },
                            '100%': { opacity: '1', transform: 'translateY(0) translateX(-50%)' },
                        }
                    }
                },
            },
        }
    </script>
<style>
        /* Custom dot grid pattern for the canvas background */
        .canvas-bg {
            background-color: transparent;
            background-image: radial-gradient(#3c6b7c 1.5px, transparent 1.5px);
            background-size: 32px 32px;
        }
        
        /* Hide scrollbar for a cleaner, app-like feel */
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }

        /* Masonry Grid Utilities */
        .masonry-column {
            break-inside: avoid;
            margin-bottom: 1.5rem;
        }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-hidden h-screen w-screen relative selection:bg-primary/30">
<!-- Infinite Canvas Background -->
<!-- This layer provides the grid texture and the illusion of infinite space -->
<div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
<div class="absolute inset-[-50%] w-[200%] h-[200%] canvas-bg opacity-[0.08] dark:opacity-[0.15]"></div>
</div>
<!-- Main Canvas Scroll Area -->
<div class="relative w-full h-full overflow-y-auto overflow-x-hidden z-10 p-4 md:p-12 lg:p-20 scroll-smooth no-scrollbar" id="main-canvas">
<!-- Content Container centered but expansive -->
<div class="max-w-[1800px] mx-auto min-h-[120vh]">
<!-- Masonry Layout using CSS Columns -->
<div class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 pb-32">
<!-- Project Card 1: Vogue Redesign -->
<div class="masonry-column group relative rounded-xl overflow-hidden shadow-[0_12px_40px_-12px_rgba(60,107,124,0.12)] hover:shadow-[0_20px_50px_-12px_rgba(60,107,124,0.25)] transition-all duration-500 hover:scale-[1.01] cursor-pointer bg-white dark:bg-[#25282a] border border-transparent dark:border-white/5">
<div class="w-full aspect-[3/4] bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
<img alt="Minimalist fashion magazine cover with red typography" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Minimalist fashion magazine cover with red typography" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2ssva_Q-kBVxlILnyHkmkCFSjAJG9--Xlzuk5f_JEP7-FDwK0iR7oMu9Xct6HGaT8nWbHOvlJ3etGfyM8V17oW-y8A-MqN2E7BtGI34u6ahNggK1_sfuLVspu8sai0JDO7DQ_dCf3OTD_6uh4qAeSGKZzzqSNwpfDBLObza_4tAtQkdrU8v5bo8KA1UrNLX5im3nqnTTvgoZmtZXWWlgoPH2F7_vqFVfAWuQUtGpSR5jL0EAEBMi6Z5ha-nMerVeluWj7bh_yVyw"/>
</div>
<!-- Frosted Glass Metadata Overlay -->
<div class="absolute inset-x-0 bottom-0 p-5 bg-white/90 dark:bg-[#1c1f21]/90 backdrop-blur-md border-t border-white/20 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
<h3 class="text-[#131516] dark:text-white text-lg font-bold leading-tight">Vogue Redesign</h3>
<div class="flex items-center gap-2 mt-2">
<span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Garamond</span>
<span class="size-3 rounded-full bg-[#FF4500] border border-black/10"></span>
<span class="text-xs text-gray-500 dark:text-gray-400 font-medium ml-auto">Oct 2023</span>
</div>
</div>
</div>
<!-- Project Card 2: Fintech Dashboard -->
<div class="masonry-column group relative rounded-xl overflow-hidden shadow-[0_12px_40px_-12px_rgba(60,107,124,0.12)] hover:shadow-[0_20px_50px_-12px_rgba(60,107,124,0.25)] transition-all duration-500 hover:scale-[1.01] cursor-pointer bg-white dark:bg-[#25282a] border border-transparent dark:border-white/5">
<div class="w-full aspect-video bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
<img alt="Clean digital dashboard interface with charts" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Clean digital dashboard interface with charts" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUNvqs_sebdU66YhjWqqYMlTOKw-zJbnuGmRWEtW8RjJfGp57G-18DJdT7pelfThl718I5_I-inTZxHxU1YKpiSpzHBBfDrdwz4TjlhFlVDd_UPAA8qA4KHc9IYxDl1ylgQH8sztNmkl580kXICtSx268GerZX7cDXnjNHOPplaRaWj0EbO1NU5bcl5LVBP97nUDkP_VI1G2Zngj_YjPQn9-oqmF5D5kVWLefsEFOUKQkn5D3iLuBNA7e5S8CXtxq2yalfEkmNE58"/>
</div>
<div class="absolute inset-x-0 bottom-0 p-5 bg-white/90 dark:bg-[#1c1f21]/90 backdrop-blur-md border-t border-white/20 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
<h3 class="text-[#131516] dark:text-white text-lg font-bold leading-tight">Fintech Dashboard</h3>
<div class="flex items-center gap-2 mt-2">
<span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Inter</span>
<span class="size-3 rounded-full bg-[#3C6B7C] border border-black/10"></span>
<span class="text-xs text-gray-500 dark:text-gray-400 font-medium ml-auto">Nov 2023</span>
</div>
</div>
</div>
<!-- Project Card 3: Coffee Brand -->
<div class="masonry-column group relative rounded-xl overflow-hidden shadow-[0_12px_40px_-12px_rgba(60,107,124,0.12)] hover:shadow-[0_20px_50px_-12px_rgba(60,107,124,0.25)] transition-all duration-500 hover:scale-[1.01] cursor-pointer bg-white dark:bg-[#25282a] border border-transparent dark:border-white/5">
<div class="w-full aspect-square bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
<img alt="Hand holding a paper coffee cup with logo" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Hand holding a paper coffee cup with logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOADySubwmjzJovbvJ3ku44p-jUKaIKrIMWwXIGU7ykWGEAH8a8lXTLBZt5j5Em6hpVDp41yl3jKIqx54bkypf0MM-QyslJhjryKuH3_OmgIaD94ONuDthCVZqOilxuqunUygbksEnXqa6uSPEZGATBEdNhRs_GAaxyoH-XmOGYK5wC0m70baTsgrYKRYfI4EmbR4RA2V5iDUuIhVj_ZyLc8jOAR3yFKHivarci-laRvjWGYemvIxNW6kAhXa4xc-SpvJQJT7jYqE"/>
</div>
<div class="absolute inset-x-0 bottom-0 p-5 bg-white/90 dark:bg-[#1c1f21]/90 backdrop-blur-md border-t border-white/20 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
<h3 class="text-[#131516] dark:text-white text-lg font-bold leading-tight">Coffee Brand</h3>
<div class="flex items-center gap-2 mt-2">
<span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Hand-drawn</span>
<span class="size-3 rounded-full bg-[#1C1F21] border border-black/10"></span>
<span class="text-xs text-gray-500 dark:text-gray-400 font-medium ml-auto">Dec 2023</span>
</div>
</div>
</div>
<!-- Project Card 4: Botanical Illustration -->
<div class="masonry-column group relative rounded-xl overflow-hidden shadow-[0_12px_40px_-12px_rgba(60,107,124,0.12)] hover:shadow-[0_20px_50px_-12px_rgba(60,107,124,0.25)] transition-all duration-500 hover:scale-[1.01] cursor-pointer bg-white dark:bg-[#25282a] border border-transparent dark:border-white/5">
<div class="w-full aspect-[2/3] bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
<img alt="Detailed green botanical leaf texture closeup" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Detailed green botanical leaf texture closeup" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmaXQ1ctEJCIQql2-9JWNJdIf4XHIt4pAFnE9m1uqktEK1bWw1dJuxu_e_5-5876eSGHGjDDVU0wJHjlrQwB87Bmm2P1XKUkQnWfHjmjvrw9gU4McLvaYFz8UKJC4UCMKi2956iJ3aIu7rPBUFLOLcBTHBOxjMotr2CoLa2nHqafZ2J_60DH0Q1LHjZd4ukz2k--xQddUsaVXJvOQfTyedyatYjjhnbc4KstS3LeI44wwl0DjdW0jCqTaSY9hJb57_NkYz31kLDdI"/>
</div>
<div class="absolute inset-x-0 bottom-0 p-5 bg-white/90 dark:bg-[#1c1f21]/90 backdrop-blur-md border-t border-white/20 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
<h3 class="text-[#131516] dark:text-white text-lg font-bold leading-tight">Botanical Illustration</h3>
<div class="flex items-center gap-2 mt-2">
<span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Caslon</span>
<span class="size-3 rounded-full bg-[#4A7C59] border border-black/10"></span>
<span class="text-xs text-gray-500 dark:text-gray-400 font-medium ml-auto">Jan 2024</span>
</div>
</div>
</div>
<!-- Project Card 5: Tech Startup Identity -->
<div class="masonry-column group relative rounded-xl overflow-hidden shadow-[0_12px_40px_-12px_rgba(60,107,124,0.12)] hover:shadow-[0_20px_50px_-12px_rgba(60,107,124,0.25)] transition-all duration-500 hover:scale-[1.01] cursor-pointer bg-white dark:bg-[#25282a] border border-transparent dark:border-white/5">
<div class="w-full aspect-video bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
<img alt="Cyberpunk neon tech workspace setup" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Cyberpunk neon tech workspace setup" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCezIh2-1IsivwI6pmD0cKdYR7BMJ64Rtiuf0XnHznY63ThHjpdT3GIFLgClAWiNozqdMDaU7YIGYv5V0Leww14icrJQNuwi0KUisn3vKjGpUxag5_CVdEmbWGiOeuzl3LdxrQFeA_0jQAlZWvhXmyZqVJuPG7aN123BNo-g_4PDVFSBsTWiuIp1EHgBnHISoV8E4EmlZRgikaKHcoG_3sg9PyR7rjHf4MAzgzIhqz6HooGDSl69vjWwfi-5tAyRYIGV6lVmFecszI"/>
</div>
<div class="absolute inset-x-0 bottom-0 p-5 bg-white/90 dark:bg-[#1c1f21]/90 backdrop-blur-md border-t border-white/20 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
<h3 class="text-[#131516] dark:text-white text-lg font-bold leading-tight">Tech Startup Identity</h3>
<div class="flex items-center gap-2 mt-2">
<span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Helvetica</span>
<span class="size-3 rounded-full bg-[#0055FF] border border-black/10"></span>
<span class="text-xs text-gray-500 dark:text-gray-400 font-medium ml-auto">Feb 2024</span>
</div>
</div>
</div>
<!-- Project Card 6: Furniture Concept -->
<div class="masonry-column group relative rounded-xl overflow-hidden shadow-[0_12px_40px_-12px_rgba(60,107,124,0.12)] hover:shadow-[0_20px_50px_-12px_rgba(60,107,124,0.25)] transition-all duration-500 hover:scale-[1.01] cursor-pointer bg-white dark:bg-[#25282a] border border-transparent dark:border-white/5">
<div class="w-full aspect-square bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
<img alt="Minimalist wooden chair on plain background" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Minimalist wooden chair on plain background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAciY1uohz9k3LPda8wowUjj4U0H8bOkWYdNokLc7dn1opC2g4-40Hixg5NTQL4YJhkM-Stogx76rX96xNlaXlekTT4PkfzntIelfGTzk6cmuEe71Y7B3frrA5v0adcNt_tmCWkyuYdllbEBG_LngBCRhOI6MX1Oc0sD83pDFZmUSIjrstXOL66qDcf9DmCIhMiuBkbzhgtL4Ffb1HBwM-NNF1a3uOuiELPTCgKGH9aij8WmJ8XFHsjqn6DWMVmYLMpJktebmflGVc"/>
</div>
<div class="absolute inset-x-0 bottom-0 p-5 bg-white/90 dark:bg-[#1c1f21]/90 backdrop-blur-md border-t border-white/20 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
<h3 class="text-[#131516] dark:text-white text-lg font-bold leading-tight">Furniture Concept</h3>
<div class="flex items-center gap-2 mt-2">
<span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-[10px] font-bold text-gray-500 uppercase tracking-wider">DM Sans</span>
<span class="size-3 rounded-full bg-[#8B4513] border border-black/10"></span>
<span class="text-xs text-gray-500 dark:text-gray-400 font-medium ml-auto">Mar 2024</span>
</div>
</div>
</div>
<!-- Project Card 7: Map Design (Using Map Component Logic) -->
<div class="masonry-column group relative rounded-xl overflow-hidden shadow-[0_12px_40px_-12px_rgba(60,107,124,0.12)] hover:shadow-[0_20px_50px_-12px_rgba(60,107,124,0.25)] transition-all duration-500 hover:scale-[1.01] cursor-pointer bg-white dark:bg-[#25282a] border border-transparent dark:border-white/5">
<div class="w-full aspect-[4/3] bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
<!-- data-location used here as requested for Map component -->
<img alt="Stylized map of city streets" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Stylized map of city streets" data-location="Tokyo, Japan" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAflQ-kWjFbs28oy7Prpv4HbMW542AXLdNsfH_WzTIb2VsT8yuf_QokBlopIAWE0aGefBLWhYpIfvkvp1t0rdgjwfNSgJSdR2OU15ew-n-7zljfNJZWZvROqi67Tx2bfBFbNZJ0qP92P_WkX7zuBvxB-aZ0-yfwvpqiviZhAkOSoGG7uqUfVqO-r4RsYFvkXDliRfSWFhvBYCCVRu1-f4QCWS_79Klpc4evfy_LOTwpg8J0z1zEWnnj5c0wiK5EIwX2CnrCXxv7XI8"/>
</div>
<div class="absolute inset-x-0 bottom-0 p-5 bg-white/90 dark:bg-[#1c1f21]/90 backdrop-blur-md border-t border-white/20 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
<h3 class="text-[#131516] dark:text-white text-lg font-bold leading-tight">City Wayfinding</h3>
<div class="flex items-center gap-2 mt-2">
<span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Manrope</span>
<span class="size-3 rounded-full bg-[#FFD700] border border-black/10"></span>
<span class="text-xs text-gray-500 dark:text-gray-400 font-medium ml-auto">Apr 2024</span>
</div>
</div>
</div>
<!-- Project Card 8: 3D Assets -->
<div class="masonry-column group relative rounded-xl overflow-hidden shadow-[0_12px_40px_-12px_rgba(60,107,124,0.12)] hover:shadow-[0_20px_50px_-12px_rgba(60,107,124,0.25)] transition-all duration-500 hover:scale-[1.01] cursor-pointer bg-white dark:bg-[#25282a] border border-transparent dark:border-white/5">
<div class="w-full aspect-square bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
<img alt="Abstract 3D rendered purple shapes" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Abstract 3D rendered purple shapes" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLsu-cN8iNtBVl-OJ88WNQ7BVA1I7FncHGhb36MhlsDQdcBI6I2JpyBuC94XGRAvuv6zy0ufI4q7JSFcnb_E9XRlYQGsuMTkdmyqY1Mho9XvizfxwGP1JYg6WSpILeI2mk_TLktOV1MA-ElDZW_1yOsi3lQ0gUlbZrN4brj0tv2-67T0LXW1k-_ARJ6oY71sVAttoIsxltJ7oV4ldmWbRiRfMqeBV7giXOv5wafFmELHOY0W5Ghyb-R2fZSy5ZTpEL4zYzLsGT8WI"/>
</div>
<div class="absolute inset-x-0 bottom-0 p-5 bg-white/90 dark:bg-[#1c1f21]/90 backdrop-blur-md border-t border-white/20 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
<h3 class="text-[#131516] dark:text-white text-lg font-bold leading-tight">3D Assets</h3>
<div class="flex items-center gap-2 mt-2">
<span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Blender</span>
<span class="size-3 rounded-full bg-[#6C63FF] border border-black/10"></span>
<span class="text-xs text-gray-500 dark:text-gray-400 font-medium ml-auto">May 2024</span>
</div>
</div>
</div>
</div>
</div>
</div>
<!-- UI Overlay Layer (Fixed positioning for tools) -->
<!-- Top Center Floating Search Bar & Header -->
<div class="fixed top-0 left-0 right-0 p-6 flex justify-center items-start z-50 pointer-events-none">
<div class="w-full max-w-5xl flex items-center justify-between gap-4 pointer-events-auto">
<!-- Branding / Logo (Left) -->
<div class="hidden md:flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-default">
<div class="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
<svg fill="none" height="18" viewbox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
<path d="M2 17L12 22L22 17" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
<path d="M2 12L12 17L22 12" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</div>
</div>
<!-- Central Floating Search Pill -->
<div class="flex-1 max-w-lg mx-auto">
<div class="group relative">
<!-- Subtle Glow -->
<div class="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-700"></div>
<!-- Search Container -->
<div class="relative flex items-center bg-white/90 dark:bg-[#1c1f21]/90 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-12 md:h-14 px-2 transition-all duration-300 focus-within:ring-4 focus-within:ring-primary/10 focus-within:border-primary/30">
<div class="pl-3 md:pl-4 text-gray-400 dark:text-gray-500">
<span class="material-symbols-outlined text-primary" style="font-size: 24px;">search</span>
</div>
<input autocomplete="off" class="w-full bg-transparent border-none focus:ring-0 text-[#131516] dark:text-slate-200 placeholder:text-gray-400 text-sm md:text-base font-medium h-full px-3 truncate" placeholder="Search projects (e.g., Project Name + font)" type="text"/>
<!-- Command Key Hint -->
<div class="hidden sm:flex items-center pr-2 gap-1 text-xs text-gray-400 font-medium">
<kbd class="hidden lg:inline-flex items-center justify-center px-2 py-1 rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-[10px] font-bold text-gray-500">⌘K</kbd>
</div>
<!-- Filter Button -->
<button class="size-8 md:size-10 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors">
<span class="material-symbols-outlined" style="font-size: 20px;">tune</span>
</button>
</div>
</div>
</div>
<!-- Profile (Right) -->
<div class="flex items-center justify-end gap-3">
<button class="size-10 md:size-12 rounded-full bg-white dark:bg-gray-800 border-2 border-white dark:border-gray-700 shadow-sm flex items-center justify-center overflow-hidden hover:scale-105 transition-all cursor-pointer group">
<img alt="Eren Sukibeleyarman Profile" class="w-full h-full object-cover opacity-90 group-hover:opacity-100" data-alt="Portrait of a woman with short dark hair" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6NUKfdiMUTuBDlxMwItAPE_Sf0v_mQCuK8syPb9-SnDqCzDWeyM4h8HIiq67J0QOuC7akiVT4qc_r9W5yTO7mVGl_dyep08ikS_2CuJoURke-mc4QvJ0AuLZOpjbRw8BFMEJBeAGv6TRtxiyB0hA7cgkcU8AQwI-bSItdZm1jnARmG4dpWK88s-44PG1l2aQ-FuHTWtOg7GqiSbJA1WRWIK6hhhkLn-vBpw5INbIDCRbJZCrzksgbUxdh_TDUTtpF3Sf-Ow7oAVA"/>
</button>
</div>
</div>
</div>
<!-- Bottom Right Floating Action Button (FAB) -->
<div class="fixed right-6 bottom-6 md:right-10 md:bottom-10 z-50 flex flex-col items-center gap-4">
<button class="group relative flex items-center justify-center size-14 md:size-16 rounded-2xl bg-primary text-white shadow-[0_8px_30px_rgb(60,107,124,0.4)] hover:shadow-[0_15px_35px_rgb(60,107,124,0.5)] hover:-translate-y-1 active:scale-95 transition-all duration-300">
<span class="material-symbols-outlined text-3xl md:text-4xl transition-transform duration-300 group-hover:rotate-90">add</span>
<!-- Tooltip -->
<span class="absolute right-full mr-5 bg-[#131516] text-white text-xs font-bold py-1.5 px-3 rounded-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all whitespace-nowrap shadow-lg">
                Add Project
            </span>
</button>
</div>
<!-- Bottom Left Mini-Map / Navigator -->
<div class="fixed left-6 bottom-6 md:left-10 md:bottom-10 z-50 hidden md:block">
<div class="w-48 h-32 bg-white/80 dark:bg-[#1c1f21]/80 backdrop-blur-md rounded-xl border border-gray-200 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-1.5 relative overflow-hidden group hover:bg-white dark:hover:bg-[#1c1f21] transition-colors">
<!-- Mini Canvas representation -->
<div class="w-full h-full bg-background-light dark:bg-background-dark rounded-lg relative overflow-hidden opacity-80">
<!-- Abstract squares representing content -->
<div class="absolute top-[10%] left-[10%] w-[15%] h-[20%] bg-gray-300 dark:bg-gray-600 rounded-[2px]"></div>
<div class="absolute top-[15%] left-[30%] w-[25%] h-[15%] bg-primary/30 rounded-[2px]"></div>
<div class="absolute top-[40%] left-[15%] w-[20%] h-[20%] bg-gray-300 dark:bg-gray-600 rounded-[2px]"></div>
<div class="absolute top-[35%] left-[50%] w-[15%] h-[25%] bg-gray-300 dark:bg-gray-600 rounded-[2px]"></div>
<!-- Active Viewport Indicator -->
<div class="absolute top-[5%] left-[5%] w-[60%] h-[50%] border-[1.5px] border-primary rounded bg-primary/5 cursor-grab active:cursor-grabbing shadow-sm backdrop-blur-[1px]"></div>
</div>
<span class="absolute bottom-3 right-3 text-[9px] font-bold text-gray-400 tracking-widest pointer-events-none">NAVIGATOR</span>
</div>
</div>
<!-- Current Zoom Level Indicator (Centered Bottom) -->
<div class="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#131516]/80 dark:bg-white/10 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide pointer-events-none opacity-0 md:opacity-100 animate-fade-in-up shadow-lg">
        100%
    </div>
</body></html>







<!DOCTYPE html>
<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Artistic Workspace Login 1</title>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#3c6b7c",
                        "background-light": "#fafaf9",
                        "background-dark": "#1c1f21",
                    },
                    fontFamily: {
                        "display": ["Plus Jakarta Sans", "sans-serif"]
                    },
                    borderRadius: {"DEFAULT": "0.5rem", "lg": "1rem", "xl": "1.5rem", "full": "9999px"},
                    animation: {
                        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
                    },
                    keyframes: {
                        fadeInUp: {
                            '0%': { opacity: '0', transform: 'translateY(10px)' },
                            '100%': { opacity: '1', transform: 'translateY(0)' },
                        }
                    }
                },
            },
        }
    </script>
<style>.canvas-bg {
            background-color: transparent;
            background-image: radial-gradient(#3c6b7c 1.5px, transparent 1.5px);
            background-size: 32px 32px;
        }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-hidden h-screen w-screen relative selection:bg-primary/30 flex items-center justify-center">
<div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
<div class="absolute inset-[-50%] w-[200%] h-[200%] canvas-bg opacity-[0.08] dark:opacity-[0.15]"></div>
</div>
<div class="absolute inset-0 overflow-hidden z-0 pointer-events-none select-none">
<div class="absolute -top-10 -left-10 w-64 h-80 rotate-[-12deg] opacity-40 blur-[2px] rounded-lg overflow-hidden border-4 border-white dark:border-white/10 shadow-xl">
<img alt="Decoration" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2ssva_Q-kBVxlILnyHkmkCFSjAJG9--Xlzuk5f_JEP7-FDwK0iR7oMu9Xct6HGaT8nWbHOvlJ3etGfyM8V17oW-y8A-MqN2E7BtGI34u6ahNggK1_sfuLVspu8sai0JDO7DQ_dCf3OTD_6uh4qAeSGKZzzqSNwpfDBLObza_4tAtQkdrU8v5bo8KA1UrNLX5im3nqnTTvgoZmtZXWWlgoPH2F7_vqFVfAWuQUtGpSR5jL0EAEBMi6Z5ha-nMerVeluWj7bh_yVyw"/>
</div>
<div class="absolute bottom-10 left-20 w-80 h-60 rotate-[6deg] opacity-50 blur-[1px] rounded-lg overflow-hidden border-4 border-white dark:border-white/10 shadow-2xl">
<img alt="Decoration" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUNvqs_sebdU66YhjWqqYMlTOKw-zJbnuGmRWEtW8RjJfGp57G-18DJdT7pelfThl718I5_I-inTZxHxU1YKpiSpzHBBfDrdwz4TjlhFlVDd_UPAA8qA4KHc9IYxDl1ylgQH8sztNmkl580kXICtSx268GerZX7cDXnjNHOPplaRaWj0EbO1NU5bcl5LVBP97nUDkP_VI1G2Zngj_YjPQn9-oqmF5D5kVWLefsEFOUKQkn5D3iLuBNA7e5S8CXtxq2yalfEkmNE58"/>
</div>
<div class="absolute top-20 -right-20 w-72 h-72 rotate-[15deg] opacity-40 blur-[2px] rounded-lg overflow-hidden border-4 border-white dark:border-white/10 shadow-xl">
<img alt="Decoration" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOADySubwmjzJovbvJ3ku44p-jUKaIKrIMWwXIGU7ykWGEAH8a8lXTLBZt5j5Em6hpVDp41yl3jKIqx54bkypf0MM-QyslJhjryKuH3_OmgIaD94ONuDthCVZqOilxuqunUygbksEnXqa6uSPEZGATBEdNhRs_GAaxyoH-XmOGYK5wC0m70baTsgrYKRYfI4EmbR4RA2V5iDUuIhVj_ZyLc8jOAR3yFKHivarci-laRvjWGYemvIxNW6kAhXa4xc-SpvJQJT7jYqE"/>
</div>
<div class="absolute top-1/2 right-10 w-56 h-80 -translate-y-1/2 rotate-[-8deg] opacity-30 blur-[3px] rounded-lg overflow-hidden border-4 border-white dark:border-white/10 shadow-xl">
<img alt="Decoration" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmaXQ1ctEJCIQql2-9JWNJdIf4XHIt4pAFnE9m1uqktEK1bWw1dJuxu_e_5-5876eSGHGjDDVU0wJHjlrQwB87Bmm2P1XKUkQnWfHjmjvrw9gU4McLvaYFz8UKJC4UCMKi2956iJ3aIu7rPBUFLOLcBTHBOxjMotr2CoLa2nHqafZ2J_60DH0Q1LHjZd4ukz2k--xQddUsaVXJvOQfTyedyatYjjhnbc4KstS3LeI44wwl0DjdW0jCqTaSY9hJb57_NkYz31kLDdI"/>
</div>
<div class="absolute -bottom-20 right-1/3 w-96 h-64 rotate-[3deg] opacity-40 blur-[2px] rounded-lg overflow-hidden border-4 border-white dark:border-white/10 shadow-xl">
<img alt="Decoration" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCezIh2-1IsivwI6pmD0cKdYR7BMJ64Rtiuf0XnHznY63ThHjpdT3GIFLgClAWiNozqdMDaU7YIGYv5V0Leww14icrJQNuwi0KUisn3vKjGpUxag5_CVdEmbWGiOeuzl3LdxrQFeA_0jQAlZWvhXmyZqVJuPG7aN123BNo-g_4PDVFSBsTWiuIp1EHgBnHISoV8E4EmlZRgikaKHcoG_3sg9PyR7rjHf4MAzgzIhqz6HooGDSl69vjWwfi-5tAyRYIGV6lVmFecszI"/>
</div>
<div class="absolute -top-16 left-1/3 w-48 h-48 rotate-[45deg] opacity-20 blur-[4px] rounded-full overflow-hidden bg-primary mix-blend-multiply dark:mix-blend-overlay"></div>
</div>
<div class="relative z-10 w-full max-w-md px-6 animate-fade-in-up">
<div class="bg-white/90 dark:bg-[#1c1f21]/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-[0_30px_60px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] p-8 md:p-10">
<div class="text-center mb-8">
<div class="inline-flex items-center justify-center size-12 bg-primary/10 rounded-xl mb-4 text-primary">
<span class="material-symbols-outlined" style="font-size: 24px;">palette</span>
</div>
<h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Studio Access</h1>
<p class="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">Enter your personal workspace</p>
</div>
<form class="space-y-5" onsubmit="event.preventDefault();">
<div class="space-y-1.5">
<label class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider pl-1" for="username">
                        Username
                    </label>
<div class="relative group">
<input class="block w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-black/20 text-slate-900 dark:text-white px-4 py-3 focus:border-primary focus:ring-primary/20 dark:focus:ring-primary/20 transition-colors shadow-sm text-sm" id="username" placeholder="eren.sukibel" type="text"/>
<div class="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
<span class="material-symbols-outlined" style="font-size: 20px;">person</span>
</div>
</div>
</div>
<div class="space-y-1.5">
<div class="flex items-center justify-between pl-1">
<label class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider" for="password">
                            Password
                        </label>
<a class="text-xs font-semibold text-primary hover:text-primary/80 transition-colors" href="#">Forgot?</a>
</div>
<div class="relative group">
<input class="block w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-black/20 text-slate-900 dark:text-white px-4 py-3 focus:border-primary focus:ring-primary/20 dark:focus:ring-primary/20 transition-colors shadow-sm text-sm" id="password" placeholder="••••••••" type="password"/>
<div class="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
<span class="material-symbols-outlined" style="font-size: 20px;">lock</span>
</div>
</div>
</div>
<button class="w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-lg font-bold text-sm hover:bg-slate-800 dark:hover:bg-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 mt-2">
<span>Sign In</span>
<span class="material-symbols-outlined" style="font-size: 18px;">arrow_forward</span>
</button>
</form>
<div class="mt-8 pt-6 border-t border-gray-100 dark:border-white/5 text-center">
<p class="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    New to the studio? 
                    <a class="text-primary hover:underline decoration-2 underline-offset-2" href="#">Request access</a>
</p>
</div>
</div>
<div class="text-center mt-6 opacity-40 hover:opacity-100 transition-opacity">
<span class="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Artistic Workspace v2.0</span>
</div>
</div>

</body></html>



<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Deep Zoom Project Detail - Metamorphosis</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&amp;family=Playfair+Display:ital,wght@0,700;1,700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#135bec",
                        "background-light": "#f6f6f8",
                        "background-dark": "#101622",
                    },
                    fontFamily: {
                        "display": ["Space Grotesk", "sans-serif"],
                        "serif": ["Playfair Display", "serif"]
                    },
                    borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>.material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24
    }
.canvas-bg {
    background-image: linear-gradient(rgba(16, 22, 34, 0.6), rgba(16, 22, 34, 0.9)), url(https://lh3.googleusercontent.com/aida-public/AB6AXuCt7ZeE9QrDPFibS9UkQo8OPZ5QKNlCQ4dnjIFIbkGkb5YiThOU69bRzkxTxHHpwor2mq7Ap7SnCEhCvZwiH1qK3FoOcaXkpwUWzM_tFIFIrV5nVr2hCdat8vaebQ1x_wr3XgthkU9wresWaOntgk8mOxA7AbCEBH3tRrD-BnQvxz8BExs-qs6fzW2VLDMZWJ3_mA8m4qEMD_nZL2tplvbdNAT_EewGgxF-xKCrSQnpNqHWb1k1SnyQcB2eM-Lt_MW2uG95rrqhLUO_);
    background-size: cover;
    background-position: center
    }</style>
</head>
<body class="bg-background-light dark:bg-background-dark font-display text-white selection:bg-primary/30 overflow-hidden h-screen">
<!-- Top Navigation -->
<header class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-gradient-to-b from-background-dark/80 to-transparent backdrop-blur-sm">
<div class="flex items-center gap-12">
<div class="flex items-center gap-3">
<div class="w-6 h-6 bg-primary rounded-sm flex items-center justify-center">
<span class="material-symbols-outlined text-[16px]">all_inclusive</span>
</div>
<h2 class="text-sm font-bold tracking-widest uppercase">Eren Suki Beleyarman</h2>
</div>
<nav class="hidden md:flex items-center gap-8">
<a class="text-xs font-bold tracking-widest uppercase text-primary" href="#">Canvas</a>
<a class="text-xs font-bold tracking-widest uppercase text-[#9da6b9] hover:text-white transition-colors" href="#">Projects</a>
<a class="text-xs font-bold tracking-widest uppercase text-[#9da6b9] hover:text-white transition-colors" href="#">Archive</a>
</nav>
</div>
<div class="flex items-center gap-6">
<div class="flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
<span class="material-symbols-outlined text-sm text-[#9da6b9]">search</span>
<input class="bg-transparent border-none focus:ring-0 text-sm placeholder:text-[#9da6b9] w-48" placeholder="Search archive..." type="text"/>
</div>
<button class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
<span class="material-symbols-outlined text-xl text-white">grid_view</span>
</button>
</div>
</header>
<!-- Main Canvas Viewport -->
<main class="relative w-full h-screen overflow-hidden flex items-center justify-center canvas-bg" data-alt="Abstract deep texture collage background with fluid shapes">
<!-- Center Metadata Overlay (The Spread) -->
<div class="relative z-10 max-w-5xl w-full px-12 flex flex-col items-start gap-8">
<!-- Breadcrumbs -->
<div class="flex items-center gap-3 text-[#9da6b9] text-xs font-bold tracking-widest uppercase">
<a class="hover:text-white transition-colors" href="#">Endless Canvas</a>
<span class="material-symbols-outlined text-xs">chevron_right</span>
<span class="text-white">Project Detail</span>
</div>
<!-- Page Heading -->
<div class="flex flex-col gap-6">
<h1 class="font-serif text-8xl md:text-9xl tracking-tighter italic text-white leading-none">Metamorphosis</h1>
<div class="flex flex-wrap items-center gap-x-8 gap-y-4">
<div class="flex flex-col">
<span class="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">Timeline</span>
<p class="text-lg text-white font-medium">Spring 2023</p>
</div>
<div class="w-px h-8 bg-white/10"></div>
<div class="flex flex-col">
<span class="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">Client</span>
<p class="text-lg text-white font-medium">Museum of Modern Art</p>
</div>
<div class="w-px h-8 bg-white/10"></div>
<div class="flex flex-col">
<span class="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">Typography</span>
<p class="text-lg text-white font-medium italic font-serif">Neue Haas Grotesk</p>
</div>
</div>
</div>
<!-- Visual Asset Teaser -->
<div class="w-full grid grid-cols-12 gap-6 mt-12">
<div class="col-span-7 aspect-[16/9] rounded-xl overflow-hidden group relative">
<div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Monochrome texture study for metamorphosis project" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBaX_Sa05RrifGW1Jg_Om8VoCxAl9LcdyJlfHmoY1GEQylK9c-60nVlAjVLlqdGdmRl8OMyiEXg_NIj1GhWS3c5V5OEhqErOIYNTQkU6yr8PBwbDZmNIoQJ_rhOskUZl3MQv06uZGf0xIq7Kma-mQvn3KPDX8He0hvZ_DQFWjz_vahN1ypG5OAp7lifQ-_32OIvmT6Z1hllTBfWyxzRvE6igTqxQIol39scLUmDiR548QnwcEHmhrb2Hb6sMxdvpYdwp9zyHVVne9nH');"></div>
<div class="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
<div class="absolute bottom-6 left-6 flex items-center gap-2">
<span class="material-symbols-outlined text-white text-sm">zoom_in</span>
<span class="text-[10px] uppercase tracking-widest font-bold">Zoom for details</span>
</div>
</div>
<div class="col-span-5 flex flex-col justify-between py-2">
<div class="space-y-4">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary">edit_note</span>
<p class="text-xs uppercase tracking-[0.2em] font-bold">Process Notes</p>
</div>
<p class="text-[#9da6b9] text-base leading-relaxed max-w-sm">
                            The visual language explores the tension between organic growth and digital decay. Using custom shaders in After Effects to simulate microscopic biological shifts.
                        </p>
</div>
<!-- Color Palette Strip -->
<div class="space-y-4">
<p class="text-[10px] uppercase tracking-widest text-[#9da6b9] font-bold">Project Palette</p>
<div class="flex gap-2">
<div class="w-12 h-12 rounded bg-[#101622] border border-white/10" title="#101622"></div>
<div class="w-12 h-12 rounded bg-[#135bec] shadow-lg shadow-primary/20" title="#135bec"></div>
<div class="w-12 h-12 rounded bg-[#e2e8f0]" title="#e2e8f0"></div>
<div class="w-12 h-12 rounded bg-[#4a5568]" title="#4a5568"></div>
<div class="w-12 h-12 rounded bg-[#cbd5e0]" title="#cbd5e0"></div>
</div>
</div>
</div>
</div>
</div>
<!-- Floatting UI Elements (Simulated Deep Zoom Layers) -->
<div class="absolute top-1/4 right-20 z-20 opacity-40 pointer-events-none hidden lg:block">
<div class="p-4 border-l border-white/20">
<p class="text-[10px] font-bold tracking-widest text-primary uppercase mb-2">Technical Info</p>
<p class="text-xs font-medium text-white/60">Renderer: Octane v2023.1</p>
<p class="text-xs font-medium text-white/60">Bit-Depth: 32-bit Float</p>
</div>
</div>
<div class="absolute bottom-20 left-20 z-20 opacity-40 pointer-events-none hidden lg:block">
<div class="p-4 border-l border-white/20">
<p class="text-[10px] font-bold tracking-widest text-primary uppercase mb-2">Layer 08</p>
<p class="text-xs font-medium text-white/60 italic font-serif">Geometric abstraction</p>
</div>
</div>
<!-- Sidebar Overlay (Deep Zoom Controls) -->
<aside class="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
<div class="bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/10 flex flex-col gap-4">
<button class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 text-[#9da6b9] hover:text-white transition-colors">
<span class="material-symbols-outlined">add</span>
</button>
<div class="h-px w-6 mx-auto bg-white/10"></div>
<button class="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white">
<span class="material-symbols-outlined">center_focus_strong</span>
</button>
<div class="h-px w-6 mx-auto bg-white/10"></div>
<button class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 text-[#9da6b9] hover:text-white transition-colors">
<span class="material-symbols-outlined">remove</span>
</button>
</div>
<button class="bg-black/40 backdrop-blur-md w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary transition-all text-white shadow-xl">
<span class="material-symbols-outlined">info</span>
</button>
</aside>
<!-- Tooltip Label for Zoom Detail -->
<div class="absolute top-[60%] left-[35%] z-30 group cursor-help">
<div class="relative">
<div class="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
<div class="absolute left-6 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
<p class="text-[10px] font-bold uppercase tracking-widest">After Effects Detail</p>
<p class="text-xs text-[#9da6b9]">Displacement Map 04</p>
</div>
</div>
</div>
</main>
<!-- Project Footer Status -->
<footer class="fixed bottom-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between pointer-events-none">
<div class="flex items-center gap-6 pointer-events-auto">
<div class="flex flex-col">
<p class="text-[10px] font-bold tracking-widest text-[#9da6b9] uppercase">Current Level</p>
<p class="text-sm font-medium">Project Spread 1:1</p>
</div>
</div>
<div class="flex items-center gap-8 pointer-events-auto">
<div class="flex items-center gap-2">
<div class="size-2 bg-green-500 rounded-full"></div>
<span class="text-[10px] font-bold tracking-widest uppercase text-[#9da6b9]">Archive Synced</span>
</div>
<div class="text-[10px] font-bold tracking-widest uppercase text-white/40">
                © 2024 ESB Archive
            </div>
</div>
</footer>
</body></html>



<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>PDF Archive Ingestion Overlay</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#135bec",
                        "background-light": "#f6f6f8",
                        "background-dark": "#101622",
                        "warm-gray": "#282e39",
                    },
                    fontFamily: {
                        "display": ["Space Grotesk"]
                    },
                    borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
                },
            },
        }
    </script>
<style>
        body {
            font-family: 'Space Grotesk', sans-serif;
        }
        .glass-overlay {
            background: rgba(16, 22, 34, 0.8);
            backdrop-filter: blur(12px);
        }
        .canvas-bg {
            background-image: radial-gradient(#282e39 1px, transparent 1px);
            background-size: 40px 40px;
        }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark font-display text-white overflow-hidden h-screen w-screen relative">
<!-- Mocked Background Canvas (Blurred) -->
<div class="absolute inset-0 canvas-bg opacity-30 blur-sm flex items-center justify-center pointer-events-none">
<div class="grid grid-cols-4 gap-8">
<div class="w-64 h-80 bg-warm-gray rounded-lg border border-white/5 shadow-2xl rotate-3"></div>
<div class="w-64 h-96 bg-warm-gray rounded-lg border border-white/5 shadow-2xl -rotate-6 mt-20"></div>
<div class="w-80 h-64 bg-warm-gray rounded-lg border border-white/5 shadow-2xl rotate-2"></div>
<div class="w-64 h-80 bg-warm-gray rounded-lg border border-white/5 shadow-2xl -rotate-12"></div>
</div>
</div>
<!-- Main Overlay Container -->
<div class="relative z-10 w-full h-full flex flex-col glass-overlay">
<!-- TopNavBar Header -->
<header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-white/10 px-10 py-4">
<div class="flex items-center gap-4 text-white">
<div class="size-6 bg-primary rounded-full flex items-center justify-center">
<span class="material-symbols-outlined text-sm">archive</span>
</div>
<h2 class="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Eren Suki Beleyarman Archive</h2>
</div>
<div class="flex flex-1 justify-end gap-8">
<div class="flex items-center gap-9">
<a class="text-white/60 hover:text-white text-sm font-medium transition-colors" href="#">Canvas</a>
<a class="text-white/60 hover:text-white text-sm font-medium transition-colors" href="#">Archive</a>
<a class="text-white/60 hover:text-white text-sm font-medium transition-colors" href="#">Collections</a>
</div>
<div class="flex gap-2">
<button class="flex items-center justify-center rounded-lg h-10 w-10 bg-warm-gray text-white border border-white/5 hover:bg-warm-gray/80 transition-all">
<span class="material-symbols-outlined">settings</span>
</button>
<button class="flex items-center justify-center rounded-lg h-10 w-10 bg-warm-gray text-white border border-white/5 hover:bg-warm-gray/80 transition-all">
<span class="material-symbols-outlined">account_circle</span>
</button>
</div>
</div>
</header>
<main class="flex-1 flex items-center justify-center p-8 overflow-hidden">
<div class="max-w-[1100px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
<!-- Left: Drop Zone -->
<div class="lg:col-span-7 flex flex-col gap-6">
<div class="flex flex-col">
<h1 class="text-white tracking-light text-[32px] font-bold leading-tight pb-2">New Ingestion</h1>
<p class="text-white/40 text-sm font-normal mb-6">Drag and drop assets directly into the creative workspace.</p>
</div>
<!-- EmptyState / DropZone -->
<div class="flex flex-col">
<div class="flex flex-col items-center justify-center gap-6 rounded-xl border-2 border-dashed border-white/20 px-6 py-24 bg-white/5 hover:bg-white/10 hover:border-primary/50 transition-all group cursor-pointer">
<div class="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined !text-3xl">upload_file</span>
</div>
<div class="flex max-w-[480px] flex-col items-center gap-2">
<p class="text-white text-xl font-bold leading-tight tracking-[-0.015em] text-center">Drop PDF to Archive</p>
<p class="text-white/40 text-sm font-normal leading-normal max-w-[320px] text-center">Files will be automatically processed for metadata extraction</p>
</div>
<button class="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-warm-gray text-white text-sm font-bold border border-white/10 hover:border-white/20 transition-all">
<span class="truncate">Browse Files</span>
</button>
</div>
</div>
</div>
<!-- Right: Auto-Extraction Visualizer -->
<div class="lg:col-span-5 flex flex-col gap-4 self-start lg:mt-20">
<div class="bg-warm-gray/40 border border-white/10 rounded-xl p-6 relative overflow-hidden">
<!-- Simulated Progress Bar -->
<div class="absolute top-0 left-0 h-1 bg-primary w-2/3 shadow-[0_0_15px_rgba(19,91,236,0.6)]"></div>
<div class="flex items-center justify-between mb-6">
<h3 class="text-white text-sm font-bold tracking-wider uppercase opacity-60">Auto-Extraction</h3>
<span class="flex items-center gap-1.5 text-[10px] text-primary font-bold">
<span class="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                                PROCESSING
                            </span>
</div>
<!-- Active File Mockup -->
<div class="flex items-center gap-4 p-4 mb-8 bg-black/20 rounded-lg border border-white/5">
<div class="w-12 h-16 bg-white/10 rounded flex items-center justify-center">
<span class="material-symbols-outlined text-white/40">picture_as_pdf</span>
</div>
<div>
<p class="text-sm font-medium text-white truncate max-w-[180px]">Suki_Manifesto_v2.pdf</p>
<p class="text-xs text-white/30">12.4 MB • Processing Layers...</p>
</div>
</div>
<!-- Extraction Results (Chips) -->
<div class="space-y-6">
<div>
<h4 class="text-xs text-white/40 mb-3 ml-1">Extracted Metadata</h4>
<div class="flex gap-2.5 flex-wrap">
<div class="flex h-9 items-center gap-x-2 rounded-lg bg-warm-gray pl-2 pr-4 border border-white/5 hover:border-primary/50 cursor-pointer transition-all">
<span class="material-symbols-outlined text-primary text-[18px]">text_format</span>
<p class="text-white text-sm font-medium">Font: Helvetica</p>
</div>
<div class="flex h-9 items-center gap-x-2 rounded-lg bg-warm-gray pl-2 pr-4 border border-white/5 hover:border-primary/50 cursor-pointer transition-all">
<span class="material-symbols-outlined text-primary text-[18px]">calendar_today</span>
<p class="text-white text-sm font-medium">Year: 2022</p>
</div>
<div class="flex h-9 items-center gap-x-2 rounded-lg bg-warm-gray pl-2 pr-4 border border-white/5 hover:border-primary/50 cursor-pointer transition-all">
<span class="material-symbols-outlined text-primary text-[18px]">layers</span>
<p class="text-white text-sm font-medium">Paper: Matte</p>
</div>
<div class="flex h-9 items-center gap-x-2 rounded-lg bg-warm-gray pl-2 pr-4 border border-white/5 hover:border-primary/50 cursor-pointer transition-all">
<span class="material-symbols-outlined text-primary text-[18px]">person</span>
<p class="text-white text-sm font-medium">Artist: Eren Suki</p>
</div>
</div>
</div>
<div>
<h4 class="text-xs text-white/40 mb-3 ml-1">Visual Palette</h4>
<div class="flex gap-2.5 flex-wrap">
<div class="flex h-9 items-center gap-x-2 rounded-lg bg-warm-gray pl-2 pr-4 border border-white/5">
<div class="w-4 h-4 rounded-full bg-[#EFEFEF] ring-1 ring-white/10"></div>
<p class="text-white text-xs font-mono">#EFEFEF</p>
<span class="material-symbols-outlined text-[14px] text-white/20">close</span>
</div>
<div class="flex h-9 items-center gap-x-2 rounded-lg bg-warm-gray pl-2 pr-4 border border-white/5">
<div class="w-4 h-4 rounded-full bg-[#101622] ring-1 ring-white/10"></div>
<p class="text-white text-xs font-mono">#101622</p>
<span class="material-symbols-outlined text-[14px] text-white/20">close</span>
</div>
<button class="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-dashed border-white/20 text-white/40 hover:text-white transition-colors">
<span class="material-symbols-outlined text-sm">add</span>
</button>
</div>
</div>
</div>
<!-- Footer Action -->
<div class="mt-10 pt-6 border-t border-white/10">
<button class="w-full flex items-center justify-center gap-2 rounded-lg h-12 bg-primary text-white text-sm font-bold tracking-wide hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
<span>Place on Canvas</span>
<span class="material-symbols-outlined text-sm">arrow_outward</span>
</button>
<p class="text-center text-[11px] text-white/30 mt-3">Confirming will anchor this asset to your active workspace.</p>
</div>
</div>
</div>
</div>
</main>
<!-- Footer / Shortcuts -->
<footer class="p-6 flex justify-between items-center text-white/20 text-[10px] uppercase tracking-[0.2em]">
<div class="flex gap-6">
<span>ESC to cancel</span>
<span>CMD+U for batch upload</span>
</div>
<div class="flex gap-6 items-center">
<span class="flex items-center gap-2"><span class="w-1 h-1 bg-white/20 rounded-full"></span> SERVER STATUS: OPTIMAL</span>
<span class="flex items-center gap-2"><span class="w-1 h-1 bg-white/20 rounded-full"></span> AI PARSER: ACTIVE</span>
</div>
</footer>
</div>
</body></html>


