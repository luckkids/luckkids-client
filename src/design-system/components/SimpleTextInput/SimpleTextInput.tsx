import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { ColorKeys, Colors, FontSettings, L } from '@design-system';
import * as S from './SimpleTextInput.styles';

interface SimpleTextInputProps extends TextInputProps {
  text: string;
  onChangeText: (text: string) => void;
  title?: string;
  focusDelay?: number;
  backgroundColor?: string;
  outline?: ColorKeys;
}

const SimpleTextInput: React.FC<SimpleTextInputProps> = ({
  text,
  onChangeText,
  placeholder,
  autoFocus = false,
  focusDelay = 600,
  backgroundColor,
  outline,
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

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <L.Col w={'100%'} mb={25}>
      <L.Row
        items="center"
        style={{
          ...S.defaultStyles.container,
          backgroundColor: backgroundColor || theme.BG_TERTIARY,
          borderColor: isFocused ? theme.LUCK_GREEN : 'transparent',
          borderWidth: 1,
          borderRadius: 15,
        }}
        outline={outline}
      >
        <TextInput
          ref={inputRef}
          style={StyleSheet.flatten([
            S.defaultStyles.textInput,
            {
              color: theme.WHITE,
              ...FontSettings['BODY_REGULAR'],
              textAlign: 'center',
            },
          ])}
          autoCorrect={false}
          spellCheck={false}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoFocus={autoFocus}
          value={text}
          numberOfLines={1}
          selectionColor={theme.LUCK_GREEN}
          placeholderTextColor={theme.GREY1}
          {...textInputProps}
        />
      </L.Row>
    </L.Col>
  );
};

export default React.memo(SimpleTextInput);
