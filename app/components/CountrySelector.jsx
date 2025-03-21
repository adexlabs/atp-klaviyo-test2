import {Form, useMatches, useLocation, useFetcher} from '@remix-run/react';
import {useEffect, useState} from 'react';

export function CountrySelector() {
  const [root] = useMatches();
  const selectedLocale = root.data.selectedLocale;
  const {pathname, search} = useLocation();

  const [countries, setCountries] = useState({});

  // Get available countries list
  const fetcher = useFetcher();
  useEffect(() => {
    if (!fetcher.data) {
      fetcher.load('/api/countries');
      return;
    }
    setCountries(fetcher.data);
  }, [countries, fetcher.data]);

  const strippedPathname = pathname.replace(selectedLocale.pathPrefix, '');

  return (
    <details>
      <summary>{selectedLocale.label}</summary>
      <div className="overflow-auto border-t py-2 bg-contrast w-full max-h-36">
        {countries &&
          Object.keys(countries).map((countryKey) => {
            const locale = countries[countryKey];
            const hreflang = `${locale.language}-${locale.country}`;

            return (
              <Form method="post" action="/locale" key={hreflang}>
                <input type="hidden" name="language" value={locale.language} />
                <input type="hidden" name="country" value={locale.country} />
                <input
                  type="hidden"
                  name="path"
                  value={`${strippedPathname}${search}`}
                />
                <button type="submit">{locale.label}</button>
              </Form>
            );
          })}
      </div>
    </details>
  );
}