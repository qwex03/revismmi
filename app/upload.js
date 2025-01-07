import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const selectFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // allows selection of all file types
        copyToCacheDirectory: true,
      });
      if (result) {
        setFile(result.assets[0]);
      }
    } catch (err) {
      console.error('Error picking document: ', err);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      setUploadStatus('No file selected');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/upload', {
        fileName: file.name,
        fileType: file.mimeType,
        fileData: file.uri,
      });
      setUploadStatus('File uploaded successfully');
    } catch (error) {
      console.error('Upload Error: ', error);
      setUploadStatus('File upload failed');
    }
  };

  return (
    <View>
      <Button title="Select File" onPress={selectFile} />
      {file && <Text>{file.name}</Text>}
      <Button title="Upload File" onPress={uploadFile} />
      {uploadStatus && <Text>{uploadStatus}</Text>}
    </View>
  );
};

export default FileUploader;