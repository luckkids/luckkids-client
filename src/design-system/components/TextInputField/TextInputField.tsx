import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { ColorKeys, Font, FontSettings, L } from '@design-system';
import * as S from './TextInputField.styles';

interface TextInputFieldProps extends TextInputProps {
  text: string;
  onChangeText: (text: string) => void;
  title?: string;
  description?: string;
  focusDelay?: number;
  errorMessage?: string;
  RightComponent?: React.ReactNode;
  isError?: boolean;
  bg?: ColorKeys;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  text,
  onChangeText,
  title,
  placeholder,
  description,
  errorMessage,
  isError,
  autoFocus = false,
  focusDelay = 600,
  RightComponent,
  bg,
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
    <L.Col w={'100%'}>
      {!!title && (
        <L.Layout pv={8}>
          <Font type="TITLE2_BOLD" color="WHITE">
            {title}
          </Font>
        </L.Layout>
      )}
      <L.Row
        items="center"
        ph={15}
        mt={8}
        g={8}
        style={{
          ...S.defaultStyles.container,
          backgroundColor: bg ? theme[bg] : theme.BG_TERTIARY,
        }}
        outline={isError ? 'RED' : undefined}
      >
        <TextInput
          ref={inputRef}
          style={StyleSheet.flatten([
            S.defaultStyles.textInput,
            {
              color: theme.WHITE,
              ...FontSettings['HEADLINE_REGULAR'],
            },
          ])}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          autoCorrect={false}
          spellCheck={false}
          value={text}
          selectionColor={theme.LUCK_GREEN}
          placeholderTextColor={theme.GREY1}
          {...textInputProps}
        />
        {!!RightComponent && <L.Row>{RightComponent}</L.Row>}
      </L.Row>
      <L.Layout>
        {isError && !!errorMessage && (
          <Font mt={10} type="SUBHEADLINE_REGULAR" color="RED">
            {errorMessage}
          </Font>
        )}
        {!!description && (
          <Font mt={10} type="SUBHEADLINE_REGULAR" color="WHITE">
            {description}
          </Font>
        )}
      </L.Layout>
    </L.Col>
  );
};

export default React.memo(TextInputField);
