export type CardTagColor = 'Gray' | 'Brown' | 'Orange' | 'Yellow' | 'Green' | 'Blue' | 'Purple' | 'Pink' | 'Red'

export function getColorCode(color: CardTagColor) {
  const map: { [key in CardTagColor]: string } = {
    Gray: '#808080',
    Brown: '#8B4513',
    Orange: '#FF4500',
    Yellow: '#FFD700',
    Green: '#006400',
    Blue: '#233B6C',
    Purple: '#4B0082',
    Pink: '#DA70D6',
    Red: '#8B0000',
  }
  return map[color]
}
