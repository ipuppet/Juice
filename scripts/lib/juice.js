const query = $context.query

var juice = require("juice")

const juiceFailed = error => {
    $jsbox.notify("juice", {
        status: false,
        error: error
    })
}

const juiceSuccess = data => {
    $jsbox.notify("juice", {
        status: true,
        data
    })
}

try {
    var result = juice(query.text)
    juiceSuccess(result)
} catch (error) {
    juiceFailed(error)
}
