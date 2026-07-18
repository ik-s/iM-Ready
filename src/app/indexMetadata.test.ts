import indexHtml from "../../index.html?raw";
import { describe, expect, it } from "vitest";

describe("document metadata", () => {
  it("uses the iM Ready product name", () => {
    expect(indexHtml).toContain("<title>iM Ready</title>");
    expect(indexHtml).toContain(
      'content="iM Ready AI 피싱 예방 챌린지 데모"',
    );
    expect(indexHtml).not.toContain("iM Shield");
  });
});
