import React, { useRef } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import ImagePicker from 'react-native-image-picker';

export default function App() {
  const webViewRef = useRef(null);

  // Handle messages from the WebView
  const handleMessage = (event) => {
    const message = JSON.parse(event.nativeEvent.data);

    if (message.type === 'openImagePicker') {
      console.log(message);

      // Trigger the image picker when the WebView requests it
      const options = {
        title: 'Select File',
        mediaType: 'photo',
        quality: 1,
      };

      const openImagePicker = async () => {
        try {
          const response = await ImagePicker.showImagePicker(options);
          if (!response.didCancel) {
            // Send the selected image URI back to the WebView
            webViewRef.current.postMessage(JSON.stringify({ type: 'input-attachment-single-0', file: response.uri }));
          }
        } catch (error) {
          // Handle any errors here
          console.error(error);
        }
      };
      
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://app.superametas.com' }}
        javaScriptEnabled={true}
        originWhitelist={['*']}
        allowFileAccess={true} // Allow access to files from a content:// URL
        allowFileAccessFromFileURLs={true} // Allow access to files from file:// URL
        onMessage={handleMessage}
      />
    </View>
  );
}
