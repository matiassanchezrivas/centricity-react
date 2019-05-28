// --------------------------------------------------------------------------
// User menu settings
// --------------------------------------------------------------------------
export default [
    {
        'text': 'MY_PROFILE',
        'click': 'goProfile()'
    },
    {
        'divider': true
    },
    {
        'text': 'REFRESH_DATA',
        'click': 'refresh()'
    },
    {
        'divider': true
    },
    {
        'text': 'English',
        'click': 'selectLanguage("en_US")'
    },
    {
        'text': 'Español',
        'click': 'selectLanguage("es_ES")'
    },
    {
        'divider': true
    },
    {
        'text': instant('HELP'),
        'click': 'help()'
    },
    {
        'text': instant('FEEDBACK_SUGGESTIONS'),
        'click': 'feedback()'
    },
    {
        'text': instant('TUTORIAL'),
        'click': 'tutorial()'
    },
    {
        'divider': true
    },
    {
        'text': instant('LOG_OUT'),
        'click': '$rootScope.$broadcast("logout")'
    }
];

