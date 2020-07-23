"use strict";
exports.__esModule = true;
exports.SEGMENT_DIVIDERS = {
    totalSections: function (numSections) {
        return function (_a) {
            var buffer = _a.buffer;
            var sections = [];
            var sectionSize = Math.floor(buffer.byteLength / numSections);
            for (var i = 0; i < numSections - 1; i++) {
                sections.push(buffer.slice(i * sectionSize, Math.min((i + 1) * sectionSize, buffer.byteLength)));
            }
            sections.push(buffer.slice(sectionSize * (numSections - 1)));
            return sections;
        };
    },
    sectionSize: function (sectionSize) {
        return function (_a) {
            var buffer = _a.buffer;
            var sections = [];
            for (var i = 0; i < buffer.byteLength;) {
                var section = buffer.slice(i, Math.min(i + sectionSize, buffer.byteLength));
                sections.push(section);
                i += section.byteLength;
            }
            return sections;
        };
    }
};
