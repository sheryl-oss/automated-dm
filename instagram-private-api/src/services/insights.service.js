"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var repository_1 = require("../core/repository");
var InsightsService = /** @class */ (function (_super) {
    __extends(InsightsService, _super);
    function InsightsService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InsightsService.prototype.account = function (options) {
        return this.client.ads.graphQL({
            surface: {
                name: 'account',
                friendlyName: 'IgInsightsAccountInsightsWithTabsQuery'
            },
            documentId: '2552829571413315',
            variables: {
                IgInsightsGridMediaImage_SIZE: options.gridMediaSize || 256,
                activityTab: options.activityTab || true,
                audienceTab: options.audienceTab || true,
                contentTab: options.contentTab || true,
                query_params: {
                    access_token: options.accessToken || '',
                    id: options.userId || this.client.state.cookieUserId
                },
                timezone: 'Environment/Local'
            }
        });
    };
    InsightsService.prototype.post = function (mediaId) {
        return this.client.ads.graphQL({
            surface: {
                name: 'post',
                friendlyName: 'IgInsightsPostInsightsQuery'
            },
            documentId: '2009845309144121',
            variables: {
                query_params: {
                    access_token: '',
                    id: mediaId
                }
            }
        });
    };
    InsightsService.prototype.igtv = function (mediaId) {
        return this.client.ads.graphQL({
            surface: {
                name: 'igtv',
                friendlyName: 'IgInsightsIGTVInsightsAppQuery'
            },
            documentId: '1744089735627228',
            variables: {
                query_params: {
                    access_token: '',
                    id: mediaId
                }
            }
        });
    };
    InsightsService.prototype.story = function (storyId) {
        return this.client.ads.graphQL({
            surface: {
                name: 'story',
                friendlyName: 'IgInsightsStoryInsightsAppQuery'
            },
            documentId: '2164420446988319',
            variables: {
                query_params: {
                    access_token: '',
                    id: storyId
                }
            }
        });
    };
    return InsightsService;
}(repository_1.Repository));
exports.InsightsService = InsightsService;
