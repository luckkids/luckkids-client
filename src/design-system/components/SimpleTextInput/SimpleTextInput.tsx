import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { FontSettings, L } from '@design-system';
import * as S from './SimpleTextInput.styles';

interface SimpleTextInputProps extends TextInputProps {
  text: string;
  onChangeText: (text: string) => void;
  title?: string;
  focusDelay?: number;
}

const SimpleTextInput: React.FC<SimpleTextInputProps> = ({
  text,
  onChangeText,
  placeholder,
  autoFocus = false,
  focusDelay = 600,
  ...textInputProps
}) => {
  const inputRef = useRef<TextInput>(null);

  const theme = useTheme();

  const handleChangeText = useCallback((value: string) => {
    onChangeText(value);
  }, []);

  useEffect(() => {
    handleChangeText(text);

    if (autoFocus) {
      setTimeout(() => {
        inputRef?.current?.focus();
      }, focusDelay);
    }
  }, []);

  return (
    <L.Col w={'100%'} mb={25}>
      <L.Row
        items="center"
        style={{
          ...S.defaultStyles.container,
          backgroundColor: theme.BG_TERTIARY,
        }}
      >
        <TextInput
          ref={inputRef}
          style={StyleSheet.flatten([
            S.defaultStyles.textInput,
            {
              color: theme.WHITE,
              ...FontSettings['BODY_REGULAR'],
            },
          ])}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          autoFocus={autoFocus}
          value={text}
          numberOfLines={1}
          textAlign="center"
          selectionColor={theme.LUCK_GREEN}
          placeholderTextColor={theme.GREY1}
          {...textInputProps}
        />
      </L.Row>
    </L.Col>
  );
};

export default React.memo(SimpleTextInput);
