"use strict";
exports.__esModule = true;
var feeds_1 = require("../feeds");
var class_transformer_1 = require("class-transformer");
var Chance = require("chance");
var user_story_feed_1 = require("../feeds/user-story.feed");
var list_reel_media_viewer_feed_1 = require("../feeds/list-reel-media-viewer.feed");
var media_inline_child_comments_feed_1 = require("../feeds/media.inline-child-comments.feed");
var media_sticker_responses_feed_1 = require("../feeds/media.sticker-responses.feed");
var FeedFactory = /** @class */ (function () {
    function FeedFactory(client) {
        this.client = client;
    }
    FeedFactory.prototype.accountFollowers = function (id) {
        var feed = new feeds_1.AccountFollowersFeed(this.client);
        feed.id = id || this.client.state.cookieUserId;
        return feed;
    };
    FeedFactory.prototype.accountFollowing = function (id) {
        var feed = new feeds_1.AccountFollowingFeed(this.client);
        feed.id = id || this.client.state.cookieUserId;
        return feed;
    };
    FeedFactory.prototype.news = function () {
        return new feeds_1.NewsFeed(this.client);
    };
    FeedFactory.prototype.discover = function () {
        return new feeds_1.DiscoverFeed(this.client);
    };
    FeedFactory.prototype.pendingFriendships = function () {
        return new feeds_1.PendingFriendshipsFeed(this.client);
    };
    FeedFactory.prototype.blockedUsers = function () {
        return new feeds_1.BlockedUsersFeed(this.client);
    };
    FeedFactory.prototype.directInbox = function () {
        return new feeds_1.DirectInboxFeed(this.client);
    };
    FeedFactory.prototype.directPending = function () {
        return new feeds_1.DirectPendingInboxFeed(this.client);
    };
    FeedFactory.prototype.directThread = function (options, seqId) {
        var feed = new feeds_1.DirectThreadFeed(this.client);
        feed.id = options.thread_id;
        feed.cursor = options.oldest_cursor;
        feed.seqId = seqId;
        return feed;
    };
    FeedFactory.prototype.user = function (id) {
        var feed = new feeds_1.UserFeed(this.client);
        feed.id = id;
        return feed;
    };
    FeedFactory.prototype.tag = function (tag) {
        var feed = new feeds_1.TagFeed(this.client);
        feed.tag = tag;
        return feed;
    };
    FeedFactory.prototype.tags = function (tag, tab) {
        if (tab === void 0) { tab = 'top'; }
        var feed = new feeds_1.TagsFeed(this.client);
        feed.tag = tag;
        feed.tab = tab;
        return feed;
    };
    FeedFactory.prototype.location = function (id, tab) {
        if (tab === void 0) { tab = 'ranked'; }
        var feed = new feeds_1.LocationFeed(this.client);
        feed.id = id;
        feed.tab = tab;
        return feed;
    };
    FeedFactory.prototype.mediaComments = function (id) {
        var feed = new feeds_1.MediaCommentsFeed(this.client);
        feed.id = id;
        return feed;
    };
    FeedFactory.prototype.reelsMedia = function (options) {
        return class_transformer_1.plainToClassFromExist(new feeds_1.ReelsMediaFeed(this.client), options);
    };
    FeedFactory.prototype.userStory = function (userId) {
        return class_transformer_1.plainToClassFromExist(new user_story_feed_1.UserStoryFeed(this.client), { userId: userId });
    };
    FeedFactory.prototype.reelsTray = function (reason) {
        if (reason === void 0) { reason = 'cold_start'; }
        return class_transformer_1.plainToClassFromExist(new feeds_1.ReelsTrayFeed(this.client), { reason: reason });
    };
    FeedFactory.prototype.timeline = function (reason) {
        var feed = new feeds_1.TimelineFeed(this.client);
        if (reason) {
            feed.reason = reason;
        }
        return feed;
    };
    FeedFactory.prototype.musicTrending = function (product) {
        if (product === void 0) { product = 'story_camera_music_overlay_post_capture'; }
        return class_transformer_1.plainToClassFromExist(new feeds_1.MusicTrendingFeed(this.client), { product: product });
    };
    FeedFactory.prototype.musicSearch = function (query, product) {
        if (product === void 0) { product = 'story_camera_music_overlay_post_capture'; }
        var options = {
            query: query,
            product: product,
            searchSessionId: new Chance(query).guid()
        };
        return class_transformer_1.plainToClassFromExist(new feeds_1.MusicSearchFeed(this.client), options);
    };
    FeedFactory.prototype.musicGenre = function (id, product) {
        if (product === void 0) { product = 'story_camera_music_overlay_post_capture'; }
        return class_transformer_1.plainToClassFromExist(new feeds_1.MusicGenreFeed(this.client), {
            id: id,
            product: product
        });
    };
    FeedFactory.prototype.musicMood = function (id, product) {
        if (product === void 0) { product = 'story_camera_music_overlay_post_capture'; }
        return class_transformer_1.plainToClassFromExist(new feeds_1.MusicMoodFeed(this.client), {
            id: id,
            product: product
        });
    };
    FeedFactory.prototype.usertags = function (id) {
        return class_transformer_1.plainToClassFromExist(new feeds_1.UsertagsFeed(this.client), { id: id });
    };
    FeedFactory.prototype.postsInsightsFeed = function (options) {
        return class_transformer_1.plainToClassFromExist(new feeds_1.PostsInsightsFeed(this.client), { options: options });
    };
    FeedFactory.prototype.storiesInsights = function (timeframe) {
        return class_transformer_1.plainToClassFromExist(new feeds_1.StoriesInsightsFeed(this.client), { timeframe: timeframe });
    };
    FeedFactory.prototype.saved = function () {
        return new feeds_1.SavedFeed(this.client);
    };
    FeedFactory.prototype.listReelMediaViewers = function (mediaId) {
        return class_transformer_1.plainToClassFromExist(new list_reel_media_viewer_feed_1.ListReelMediaViewerFeed(this.client), { mediaId: mediaId });
    };
    FeedFactory.prototype.mediaInlineChildComments = function (mediaId, commentId, minId) {
        return class_transformer_1.plainToClassFromExist(new media_inline_child_comments_feed_1.MediaInlineChildCommentsFeed(this.client), {
            mediaId: mediaId,
            commentId: commentId,
            nextMinId: minId
        });
    };
    FeedFactory.prototype.igtvBrowse = function (isPrefetch) {
        return class_transformer_1.plainToClassFromExist(new feeds_1.IgtvBrowseFeed(this.client), {
            isPrefetch: !!isPrefetch
        });
    };
    FeedFactory.prototype.storyQuestionResponses = function (mediaId, stickerId) {
        return class_transformer_1.plainToClassFromExist(new media_sticker_responses_feed_1.MediaStickerResponsesFeed(this.client), {
            mediaId: mediaId,
            stickerId: stickerId,
            name: 'story_question_responses',
            rootName: 'responder_info',
            itemName: 'responders'
        });
    };
    FeedFactory.prototype.storyPollVoters = function (mediaId, stickerId) {
        return class_transformer_1.plainToClassFromExist(new media_sticker_responses_feed_1.MediaStickerResponsesFeed(this.client), {
            mediaId: mediaId,
            stickerId: stickerId,
            name: 'story_poll_voters',
            rootName: 'voter_info',
            itemName: 'voters'
        });
    };
    FeedFactory.prototype.storyQuizParticipants = function (mediaId, stickerId) {
        return class_transformer_1.plainToClassFromExist(new media_sticker_responses_feed_1.MediaStickerResponsesFeed(this.client), {
            mediaId: mediaId,
            stickerId: stickerId,
            name: 'story_quiz_participants',
            rootName: 'participant_info',
            itemName: 'participants'
        });
    };
    FeedFactory.prototype.storySliderVoters = function (mediaId, stickerId) {
        return class_transformer_1.plainToClassFromExist(new media_sticker_responses_feed_1.MediaStickerResponsesFeed(this.client), {
            mediaId: mediaId,
            stickerId: stickerId,
            name: 'story_slider_voters',
            rootName: 'voter_info',
            itemName: 'voters'
        });
    };
    FeedFactory.prototype.igtvChannel = function (id) {
        if (/[0-9]/.test(id.toString())) {
            id = "user_" + id;
        }
        return class_transformer_1.plainToClassFromExist(new feeds_1.IgtvChannelFeed(this.client), {
            channelId: id
        });
    };
    /**
     * Returns the suggested videos after the current (id) one
     * @param id pk of the video
     */
    FeedFactory.prototype.igtvChaining = function (id) {
        return this.igtvChannel("chaining_" + id);
    };
    FeedFactory.prototype.liked = function () {
        return new feeds_1.LikedFeed(this.client);
    };
    return FeedFactory;
}());
exports.FeedFactory = FeedFactory;
