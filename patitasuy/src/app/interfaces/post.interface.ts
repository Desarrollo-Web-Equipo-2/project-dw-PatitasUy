export interface Post {
    // TODO: add user owner of the post.
    post_id:number;
    user_id: number;
    url:string;
    description: string;
    age: number;
    sex: string;
    specie: string;
    location: string;
    size: string;
    state: 'Activo' | 'Finalizado';
    title:string;
}
