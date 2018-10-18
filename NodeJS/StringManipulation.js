function getMatchesWithPrefixSuffix(baseText, prefix, suffix) {
    var matchArr = [];

    matchArr = baseText.match(new RegExp(/\(\([a-z.:_]*\)\)/g));
    for (let i = 0; i < matchArr.length; i++) {
        matchArr[i] = matchArr[i].replace(prefix, '').replace(suffix, '');
    }
    return matchArr;
}

var matchArr = getMatchesWithPrefixSuffix("this ((is)) and example text with ((proper)) text", "((", "))");
console.log('matchArr :', matchArr);