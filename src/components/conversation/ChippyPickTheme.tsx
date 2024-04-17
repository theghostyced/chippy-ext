import ForcedOptions from '~components/ForcedOptions';
import { updateUserStatus } from '~features/settings/settingsSlice';
import { useTrackEvent } from '~hooks/useTrackEvent';
import { useTheme } from '~providers/ThemeProvider';
import { useAppDispatch } from '~store';
import { ThemesTypes, type ThemeMode, UserStatus } from '~utils/types';

export default function ChippyPickTheme() {
  const { toggleTheme } = useTheme();
  const dispatch = useAppDispatch();
  const { trackEvent } = useTrackEvent();
  const selectTheme = (incomingTheme: ThemeMode) => {
    toggleTheme(incomingTheme);
  };

  const handleSubmit = () => {
    dispatch(updateUserStatus({ status: UserStatus.theme }));
  };

  const options = [
    { label: 'Light', value: ThemesTypes.light },
    { label: 'Dark', value: ThemesTypes.dark },
    { label: 'Windows 98', value: ThemesTypes.window98 },
    { label: 'Glossy', value: ThemesTypes.glossy },
  ];

  return (
    <ForcedOptions
      title={'Nice job! Now pick your theme!'}
      onSubmit={handleSubmit}
      options={options.map((theme) => ({
        label: theme.label,
        value: theme.value,
        onClick: async () => {
          trackEvent('OnboardingTheme');
          selectTheme(theme.value);
        },
      }))}
    />
  );
}
