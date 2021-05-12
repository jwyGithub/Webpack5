class CreateElemet {
    constructor(tagName, tagAttr, tagContent) {
        this.tag = this.createTag(tagName, tagAttr, tagContent);
    }
    createTag(tagName, tagAttr, tagContent) {
        const _tag = document.createElement(tagName);
        Object.keys(tagAttr).forEach(attr => _tag.setAttribute(attr, tagAttr[attr]));
        _tag.innerHTML = tagContent;
        return _tag;
    }
}

const createElement = new CreateElemet('div', { id: 'content' }, '测试');
document.getElementById('root').appendChild(createElement.tag)