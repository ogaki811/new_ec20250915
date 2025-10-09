export const useRouter = () => ({
  push: (url) => console.log('Navigate to:', url),
  replace: (url) => console.log('Replace with:', url),
  back: () => console.log('Navigate back'),
  pathname: '/',
  query: {},
});

export const usePathname = () => '/';

export const useSearchParams = () => new URLSearchParams();
