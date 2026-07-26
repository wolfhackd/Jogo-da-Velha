import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { socket } from "~/config/socket/socket";
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        setUsername(e.target.username.value);
    }

    const handleCreateRoom = () => {
        const roomId = uuidv4();
        navigate(`/game/${roomId}`);
    }

    const handleJoinRoom = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const roomId = e.target.roomId.value;
        navigate(`/game/${roomId}`);
    }



    return (
        <main className=" flex min-h-screen items-center justify-center bg-gray-900">

            {!username && 
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Escolha seu apelido</CardTitle>
                    <CardDescription>
                        Escolha seu apelido e comece a jogar
                    </CardDescription>
                </CardHeader>
                <CardContent>
                <form id="form" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="username">Apelido</Label>
                        <Input
                        id="username"
                        name="username"
                        type="username"
                        placeholder="Coxinha123"
                        required
                        />
                    </div>
                    </div>
                </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                <Button type="submit" form="form" className="w-full">
                    Jogar
                </Button>
                </CardFooter>
            </Card>
            }
            {username && 
            <Card>
                <CardHeader>
                    <CardTitle>Entre em uma sala</CardTitle>
                    <CardDescription>
                        Crie uma sala ou entre em uma com um id
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">

                    <div className="flex flex-col gap-2 w-full">
                    <form onSubmit={handleJoinRoom}>

                    <Input placeholder="ID da sala" name="roomId"/>
                    <Button type="submit" className="w-full">Entrar</Button>
                    
                    </form>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                    <Button className="w-full" onClick={handleCreateRoom}>Crie uma sala</Button>
                    </div>
                </CardContent>
              
            </Card>
            }

        </main>
  )
}