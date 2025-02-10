'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { IconButton, Tooltip, Switch, FormControlLabel, useTheme as useMuiTheme } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTranslations } from 'next-intl';

interface ThemeToggleProps {
  locale: string;
}

export default function ThemeToggle({ locale }: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const t = useTranslations('global'); // ✅ Récupération des traductions
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (resolvedTheme) {
      setChecked(resolvedTheme === 'dark');
    }
  }, [resolvedTheme]);

  const handleToggle = () => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={handleToggle}
          color="default"
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: muiTheme.palette.primary.main,
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: muiTheme.palette.primary.main,
            },
          }}
        />
      }
      label={
        <Tooltip title={t('toggleTheme', { theme: checked ? t('lightMode') : t('darkMode') })}>
          <IconButton color="inherit" onClick={handleToggle}>
            {checked ? (
              <DarkModeIcon sx={{ color: muiTheme.palette.primary.main }} />
            ) : (
              <LightModeIcon sx={{ color: muiTheme.palette.primary.main }} />
            )}
          </IconButton>
        </Tooltip>
      }
      labelPlacement="start"
    />
  );
}
