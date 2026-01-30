import { collection, addDoc, getDocs, query, orderBy, Timestamp } from "firebase/firestore";
import { db } from "./firebase";
import type { Project } from "../types";

const COLLECTION_NAME = "projects";

// Mock data to use when Firebase fails or is empty
export const MOCK_PROJECTS: Project[] = [
    {
        id: '1',
        title: 'Vogue Redesign',
        font: 'Garamond',
        color: '#FF4500',
        date: 'Oct 2023',
        aspectRatio: 'aspect-[3/4]',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2ssva_Q-kBVxlILnyHkmkCFSjAJG9--Xlzuk5f_JEP7-FDwK0iR7oMu9Xct6HGaT8nWbHOvlJ3etGfyM8V17oW-y8A-MqN2E7BtGI34u6ahNggK1_sfuLVspu8sai0JDO7DQ_dCf3OTD_6uh4qAeSGKZzzqSNwpfDBLObza_4tAtQkdrU8v5bo8KA1UrNLX5im3nqnTTvgoZmtZXWWlgoPH2F7_vqFVfAWuQUtGpSR5jL0EAEBMi6Z5ha-nMerVeluWj7bh_yVyw'
    },
    {
        id: '2',
        title: 'Fintech Dashboard',
        font: 'Inter',
        color: '#3C6B7C',
        date: 'Nov 2023',
        aspectRatio: 'aspect-video',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUNvqs_sebdU66YhjWqqYMlTOKw-zJbnuGmRWEtW8RjJfGp57G-18DJdT7pelfThl718I5_I-inTZxHxU1YKpiSpzHBBfDrdwz4TjlhFlVDd_UPAA8qA4KHc9IYxDl1ylgQH8sztNmkl580kXICtSx268GerZX7cDXnjNHOPplaRaWj0EbO1NU5bcl5LVBP97nUDkP_VI1G2Zngj_YjPQn9-oqmF5D5kVWLefsEFOUKQkn5D3iLuBNA7e5S8CXtxq2yalfEkmNE58'
    },
    {
        id: '3',
        title: 'Coffee Brand',
        font: 'Hand-drawn',
        color: '#1C1F21',
        date: 'Dec 2023',
        aspectRatio: 'aspect-square',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOADySubwmjzJovbvJ3ku44p-jUKaIKrIMWwXIGU7ykWGEAH8a8lXTLBZt5j5Em6hpVDp41yl3jKIqx54bkypf0MM-QyslJhjryKuH3_OmgIaD94ONuDthCVZqOilxuqunUygbksEnXqa6uSPEZGATBEdNhRs_GAaxyoH-XmOGYK5wC0m70baTsgrYKRYfI4EmbR4RA2V5iDUuIhVj_ZyLc8jOAR3yFKHivarci-laRvjWGYemvIxNW6kAhXa4xc-SpvJQJT7jYqE'
    },
    {
        id: '4',
        title: 'Botanical Illustration',
        font: 'Caslon',
        color: '#4A7C59',
        date: 'Jan 2024',
        aspectRatio: 'aspect-[2/3]',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmaXQ1ctEJCIQql2-9JWNJdIf4XHIt4pAFnE9m1uqktEK1bWw1dJuxu_e_5-5876eSGHGjDDVU0wJHjlrQwB87Bmm2P1XKUkQnWfHjmjvrw9gU4McLvaYFz8UKJC4UCMKi2956iJ3aIu7rPBUFLOLcBTHBOxjMotr2CoLa2nHqafZ2J_60DH0Q1LHjZd4ukz2k--xQddUsaVXJvOQfTyedyatYjjhnbc4KstS3LeI44wwl0DjdW0jCqTaSY9hJb57_NkYz31kLDdI'
    },
    {
        id: '5',
        title: 'Tech Startup Identity',
        font: 'Helvetica',
        color: '#0055FF',
        date: 'Feb 2024',
        aspectRatio: 'aspect-video',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCezIh2-1IsivwI6pmD0cKdYR7BMJ64Rtiuf0XnHznY63ThHjpdT3GIFLgClAWiNozqdMDaU7YIGYv5V0Leww14icrJQNuwi0KUisn3vKjGpUxag5_CVdEmbWGiOeuzl3LdxrQFeA_0jQAlZWvhXmyZqVJuPG7aN123BNo-g_4PDVFSBsTWiuIp1EHgBnHISoV8E4EmlZRgikaKHcoG_3sg9PyR7rjHf4MAzgzIhqz6HooGDSl69vjWwfi-5tAyRYIGV6lVmFecszI'
    },
    {
        id: '6',
        title: 'Furniture Concept',
        font: 'DM Sans',
        color: '#8B4513',
        date: 'Mar 2024',
        aspectRatio: 'aspect-square',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAciY1uohz9k3LPda8wowUjj4U0H8bOkWYdNokLc7dn1opC2g4-40Hixg5NTQL4YJhkM-Stogx76rX96xNlaXlekTT4PkfzntIelfGTzk6cmuEe71Y7B3frrA5v0adcNt_tmCWkyuYdllbEBG_LngBCRhOI6MX1Oc0sD83pDFZmUSIjrstXOL66qDcf9DmCIhMiuBkbzhgtL4Ffb1HBwM-NNF1a3uOuiELPTCgKGH9aij8WmJ8XFHsjqn6DWMVmYLMpJktebmflGVc'
    },
    {
        id: '7',
        title: 'City Wayfinding',
        font: 'Manrope',
        color: '#FFD700',
        date: 'Apr 2024',
        aspectRatio: 'aspect-[4/3]',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAflQ-kWjFbs28oy7Prpv4HbMW542AXLdNsfH_WzTIb2VsT8yuf_QokBlopIAWE0aGefBLWhYpIfvkvp1t0rdgjwfNSkJSdR2OU15ew-n-7zljfNJZWZvROqi67Tx2bfBFbNZJ0qP92P_WkX7zuBvxB-aZ0-yfwvpqiviZhAkOSoGG7uqUfVqO-r4RsYFvkXDliRfSWFhvBYCCVRu1-f4QCWS_79Klpc4evfy_LOTwpg8J0z1zEWnnj5c0wiK5EIwX2CnrCXxv7XI8'
    },
    {
        id: '8',
        title: '3D Assets',
        font: 'Blender',
        color: '#6C63FF',
        date: 'May 2024',
        aspectRatio: 'aspect-square',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLsu-cN8iNtBVl-OJ88WNQ7BVA1I7FncHGhb36MhlsDQdcBI6I2JpyBuC94XGRAvuv6zy0ufI4q7JSFcnb_E9XRlYQGsuMTkdmyqY1Mho9XvizfxwGP1JYg6WSpILeI2mk_TLktOV1MA-ElDZW_1yOsi3lQ0gUlbZrN4brj0tv2-67T0LXW1k-_ARJ6oY71sVAttoIsxltJ7oV4ldmWbRiRfMqeBV7giXOv5wafFmELHOY0W5Ghyb-R2fZSy5ZTpEL4zYzLsGT8WI'
    }
];

export const getProjects = async (): Promise<Project[]> => {
    try {
        const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const projects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));

        // If no projects in DB, return mock data
        if (projects.length === 0) {
            return MOCK_PROJECTS;
        }
        return projects;
    } catch (error) {
        console.error("Error fetching projects:", error);
        return MOCK_PROJECTS;
    }
};

export const addProject = async (project: Omit<Project, 'id'>) => {
    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...project,
            createdAt: Timestamp.now()
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding project:", error);
        throw error;
    }
};
