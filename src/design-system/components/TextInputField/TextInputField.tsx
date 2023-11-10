import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Font, FontSettings, L } from '@design-system';
import * as S from './TextInputField.styles';

interface TextInputFieldProps extends TextInputProps {
  text: string;
  onChangeText: (text: string) => void;
  title?: string;
  description?: string;
  focusDelay?: number;
  notice?: string;
  RightComponent?: React.ReactNode;
  reg?: boolean;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  text,
  onChangeText,
  title,
  placeholder,
  description,
  notice,
  reg,
  autoFocus = false,
  focusDelay = 600,
  RightComponent,
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
        g={8}
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
              ...FontSettings['HEADLINE_REGULAR'],
            },
          ])}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          value={text}
          numberOfLines={1}
          selectionColor={theme.LUCK_GREEN}
          placeholderTextColor={theme.GREY1}
          {...textInputProps}
        />
        {!!RightComponent && <L.Row>{RightComponent}</L.Row>}
      </L.Row>
      {!!description && (
        <L.Layout pv={10}>
          {!reg && <Font type="FOOTNOTE_REGULAR">{notice}</Font>}
          <Font type="FOOTNOTE_REGULAR" color="WHITE">
            {description}
          </Font>
        </L.Layout>
      )}
    </L.Col>
  );
};

export default React.memo(TextInputField);
