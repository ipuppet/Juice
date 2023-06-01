var juice = require("juice")
const isTaio = $app.info.bundleID.includes("taio")

const juiceFailed = error => {
    if (isTaio) {
        $actions.reject(error)
    } else {
        $jsbox.notify("juice", {
            status: false,
            error: error
        })
    }
}

const juiceSuccess = data => {
    if (isTaio) {
        $actions.resolve(data)
    } else {
        $jsbox.notify("juice", {
            status: true,
            data
        })
    }
}

try {
    const text = isTaio ? $actions.inputValue : $context.query?.text
    var result = juice(text)
    juiceSuccess(result)
} catch (error) {
    juiceFailed(error)
}
