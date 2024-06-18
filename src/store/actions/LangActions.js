export const CHANGE_LANG = 'change lang';

export function changeLang(status) {
    localStorage.setItem('masterHN_Lang', status)

    return {
        type: CHANGE_LANG,
        payload: status,
    };
}