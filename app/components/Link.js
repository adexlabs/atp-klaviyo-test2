import {
    Link as RemixLink,
    NavLink as RemixNavLink,
    useMatches,
  } from '@remix-run/react';
  import {usePrefixPathWithLocale} from '~/lib/utils';
  
  export function Link(props) {
    const {to, className, ...resOfProps} = props;
    const [root] = useMatches();
    const selectedLocale = root.data.selectedLocale;
  
    let toWithLocale = to;
  
    if (typeof to === 'string') {
      toWithLocale = selectedLocale ? `${selectedLocale.pathPrefix}${to}` : to;
    }
  
    if (typeof className === 'function') {
      return (
        <RemixNavLink
          to={toWithLocale}
          className={className}
          {...resOfProps}
        />
      );
    }
  
    return (
      <RemixLink to={toWithLocale} className={className} {...resOfProps} />
    );
  }
  
  export function usePrefixPathWithLocale(path) {
    const [root] = useMatches();
    const selectedLocale = root.data.selectedLocale;
  
    return selectedLocale
      ? `${selectedLocale.pathPrefix}${
          path.startsWith('/') ? path : '/' + path
        }`
      : path;
  }