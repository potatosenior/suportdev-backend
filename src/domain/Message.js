"use strict";

module.exports = class {
  constructor(id = null, callId, content, createdAt = null) {
    this.id = id;
    this.callId = callId;
    this.content = content;
    this.createdAt = createdAt;
  }
};
