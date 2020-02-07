export class CharTools{
    public static nextChar(c) {
        return String.fromCharCode(c.charCodeAt(0) + 1);
    }
    public static previousChar(c) {
        return String.fromCharCode(c.charCodeAt(0) - 1);
    }
}