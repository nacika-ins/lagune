import * as auth from "@@/renderer/auth"
// @ponicode
describe("auth.fetchAuthorizationUrl", () => {
    test("0", async () => {
        await auth.fetchAuthorizationUrl("smtp-relay.sendinblue.com")
    })

    test("1", async () => {
        await auth.fetchAuthorizationUrl("smtp.gmail.com")
    })

    test("2", async () => {
        await auth.fetchAuthorizationUrl("")
    })
})

// @ponicode
describe("auth.verifyCode", () => {
    test("0", async () => {
        await auth.verifyCode("smtp.gmail.com", "function(code) {\n\t\t\t\treturn I.mode === 'client' || !Basic.arrayDiff(code, [200, 404]);\n\t\t\t}")
    })

    test("1", async () => {
        await auth.verifyCode("smtp.gmail.com", "function substr(start, length) {\n        return string_substr.call(\n            this,\n            start < 0 ? ((start = this.length + start) < 0 ? 0 : start) : start,\n            length\n        );\n    }")
    })

    test("2", async () => {
        await auth.verifyCode("smtp-relay.sendinblue.com", "function unescape(code) {\n        return code.replace(/\\\\('|\\\\)/g, \"$1\").replace(/[\\r\\t\\n]/g, \" \");\n    }")
    })

    test("3", async () => {
        await auth.verifyCode("smtp-relay.sendinblue.com", "function log(code) {\n        var args = [];\n        for (var _i = 1; _i < arguments.length; _i++) {\n            args[_i - 1] = arguments[_i];\n        }\n        console.log(utils.tr.apply(null, arguments));\n    }\n")
    })

    test("4", async () => {
        await auth.verifyCode("smtp-relay.sendinblue.com", "function substr(start, length) {\n        return string_substr.call(\n            this,\n            start < 0 ? ((start = this.length + start) < 0 ? 0 : start) : start,\n            length\n        );\n    }")
    })

    test("5", async () => {
        await auth.verifyCode("", "")
    })
})
