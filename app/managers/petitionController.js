import { deletePetition, updatePetition } from "../utils/Api";

export const updatePetitionStatus = async (petition, status, aberto, loadList) => {
    try {
        const updatedPetition = { ...petition, status, aberto };

        // Limpa os apoiadores se a petição for fechada (status 0 ou -1)
        if (status === 0 || status === -1) {
            updatedPetition.apoiadores = [];
        }

        const resp = await updatePetition(petition.id, updatedPetition);

        if (resp.error) {
            console.error("Erro ao atualizar status da petição:", resp.error);
            return;
        }

        loadList(); // Recarrega a lista após atualização
    } catch (error) {
        console.error("Erro inesperado:", error);
    }
};

export const updatePetitionSignatures = async (petition, loadList, user) => {
    try {
        const updatedPetition = { ...petition };
        updatedPetition.signatures += 1;

        if (!updatedPetition.apoiadores) {
            updatedPetition.apoiadores = [];
        }
        updatedPetition.apoiadores.push(user.id);

        const resp = await updatePetition(petition.id, updatedPetition);

        if (resp.error) {
            console.error("Erro ao atualizar assinaturas da petição:", resp.error);
            return;
        }

        loadList(); // Recarrega a lista após atualização
    } catch (error) {
        console.error("Erro inesperado:", error);
    }
};

export const deletePetitionControl = async (petition, onSuccess) => {
    try {
        const resp = await deletePetition(petition.id);

        if (resp.error) {
            console.error("Erro ao deletar petição:", resp.error);
            return;
        }

        onSuccess(); // Navegar ou recarregar a lista
    } catch (error) {
        console.error("Erro inesperado:", error);
    }
};
