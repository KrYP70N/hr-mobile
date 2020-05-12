import color from './color'
import padding from './padding'
export default {
    primary: {
        backgroundColor: color.primary,
        padding: padding.p1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 5
    },
    secondary: {
        padding: padding.p1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D4D4D4'
    }
}