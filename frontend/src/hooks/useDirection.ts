import { useTranslation } from 'react-i18next';

export const useDirection = () => {
  const { i18n } = useTranslation();
  
  const isRTL = i18n.language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';
  
  // Helper function to force LTR for specific components
  const forceLTR = () => ({ dir: 'ltr' });
  
  // Helper function to respect global direction
  const respectDirection = () => ({ dir: direction });
  
  return {
    isRTL,
    direction,
    forceLTR,
    respectDirection,
  };
};