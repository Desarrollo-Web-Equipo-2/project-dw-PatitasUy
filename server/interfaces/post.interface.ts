export interface PostDto {
    // TODO: add user owner of the post.
    id: number;
    title: string;
    url: string | String[];
    description: string;
    age: string;
    sex: string;
    type: string;
    size: string;
    location: string;
    state: 'Activo' | 'Finalizado';
}
