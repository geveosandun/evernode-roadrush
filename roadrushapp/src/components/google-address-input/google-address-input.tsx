import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import AppSettings from '../../helpers/app-settings';
import AppTheme from '../../helpers/theme';

export default function GoogleAddressInput({onSelected}): React.JSX.Element {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      minLength={3}
      fetchDetails={true}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        // console.log(data, details);
        console.log(details.geometry.location);

        onSelected(details.geometry.location);
      }}
      query={{
        key: AppSettings.googleApiKey,
        language: 'en',
      }}
      styles={{
        textInputContainer: {
          backgroundColor: AppTheme.specification.colors.white,
          borderColor: AppTheme.specification.colors.mediumGrey,
          borderWidth: 3,
          margin: 10,
          borderRadius: 10,
        },
        textInput: {
          color: AppTheme.specification.colors.black,
          fontSize: 16,
        },
        predefinedPlacesDescription: {
          //   color: '#1faadb',
        },
      }}
    />
  );
}
