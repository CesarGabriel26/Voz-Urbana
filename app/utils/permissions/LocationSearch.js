
export async function getCountries() {
    // const response = await fetch('https://restcountries.com/v3.1/all?fields=translations,cca2');
    // const countriesData = await response.json();

    // return countriesData.map(country => ({
    //     name: country.translations.por.common,
    //     code: country.cca2 // Código ISO 3166-1 alpha-2
    // }));

    return [
        {
            name: "Brasil",
            code: "BR"
        }
    ]
}

export async function getStates() {
    const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    const states = await response.json();
    return states.map(state => ({ name: state.nome, code: state.sigla }));
}

export async function getCities(stateCode) {
    const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateCode}/municipios`);
    const cities = await response.json();
    return cities.map(city => city.nome);
}
