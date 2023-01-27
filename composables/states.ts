export const useActiveCategory = () => useState('activeCategory', () => 'population')
export const useSettingsTheme = () => useState('settingsTheme', () => 'blue-marble')
export const useActiveYear = () => useState('activeYear', () => new Date().getFullYear() - 1)
