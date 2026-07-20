import indexHtml from "../../index.html?raw";
import { describe, expect, it } from "vitest";

describe("document metadata", () => {
  it("uses the iM Shield product name", () => {
    expect(indexHtml).toContain("<title>iM Shield</title>");
    expect(indexHtml).toContain(
      'content="iM Shield AI 피싱 예방 챌린지 데모"',
    );
    expect(indexHtml).not.toContain("iM Ready");
  });
});
