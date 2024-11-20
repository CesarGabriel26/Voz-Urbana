import React from "react"

export const ButtonsStyles = {
    btn: {
        textTransform: "uppercase",
        width: '100%',
        textAlign: 'center',
        paddingHorizontal: 10,
    },

    default: {
        display: 'flex',
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },

    ghost: {
        display: 'flex',
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
    },

    j_betwen: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
    }
}