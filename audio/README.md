# Audio Files for Screen 8 Popup

## File Requirements

To add audio to the popup message, please upload your audio file(s) to this directory.

## Supported Formats
- **MP3** (recommended): `popup-message.mp3`
- **WAV**: `popup-message.wav`

## File Naming
The system looks for these exact filenames:
- `popup-message.mp3` (primary)
- `popup-message.wav` (fallback)

## Audio Content
The audio should say:
> "This is wrong! Let's try it by doing it yourself. Click the simulation button to see what actually happens!"

## Recommended Specifications
- **Duration**: 5-8 seconds
- **Quality**: 128kbps or higher
- **Voice**: Clear, child-friendly voice
- **Tone**: Encouraging and educational

## How It Works
1. When user selects wrong answer (Beaker A or B)
2. Popup appears with audio automatically playing
3. Visual indicator shows "Audio Playing..." with 🔊 icon
4. Audio indicator disappears when audio finishes
5. User can close popup with "Got it!" button

## Fallback
If no audio file is found, the popup will still work but without audio.
