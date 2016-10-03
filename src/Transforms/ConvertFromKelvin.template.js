import I18n from 'react-native-18n';

export default kelvin => {
  const celcius = kelvin - 273.15;
  const farenheit = (celcius * 1.80000) + 32;

  if (I18n.t('tempIndicator') === 'F') return Math.round(farenheit);
  return Math.round(celcius);
};
