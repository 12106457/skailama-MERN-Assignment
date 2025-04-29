import { Inter, Poppins, Public_Sans, Roboto } from 'next/font/google';

export const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '700']
    //['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const publicsans = Public_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700']
    //['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700']
    //['100', '200', '300', '400', '500', '600', '700', '800', '900']
});