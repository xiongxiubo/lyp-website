import { describe, expect, test } from "bun:test";
import { cooperationBody, cooperationPayload } from "../server/utils/cooperation-schema";
import { unwrapCooperation } from "../server/utils/cooperation-upstream";

const validBody = () => ({
  type: "scenic",
  province: " 河南省 ",
  city: " 洛阳市 ",
  scenicName: " 龙门石窟 ",
  contact: " 张先生 ",
  contactMethod: " wx_lyp ",
  introduction: " 有合作经验。 ",
});

describe("website cooperation API", () => {
  test("validates and converts the browser payload to the public API contract", () => {
    expect(cooperationPayload(cooperationBody(validBody()))).toEqual({
      type: "scenic",
      province: "河南省",
      city: "洛阳市",
      scenic_name: "龙门石窟",
      contact: "张先生",
      contact_method: "wx_lyp",
      introduction: "有合作经验。",
      source: "website",
    });
  });

  test("rejects malformed bodies, missing required fields, and oversized Unicode input", () => {
    for (const body of [null, [], "invalid"]) {
      expect(() => cooperationBody(body)).toThrow();
    }
    expect(() => cooperationPayload(cooperationBody({ ...validBody(), contact: "  " }))).toThrow("请填写联系人");
    expect(() => cooperationPayload(cooperationBody({ ...validBody(), introduction: "旅".repeat(501) }))).toThrow("合作介绍超过长度限制");
    expect(() => cooperationPayload(cooperationBody({ ...validBody(), type: "city", scenicName: "" }))).not.toThrow();
  });

  test("only treats a successful API envelope as a successful submission", () => {
    expect(unwrapCooperation({ code: 0, data: { id: "record" } })).toEqual({ id: "record" });
    expect(() => unwrapCooperation({ code: 1, msg: "failed" })).toThrow("提交通道返回异常");
  });
});
