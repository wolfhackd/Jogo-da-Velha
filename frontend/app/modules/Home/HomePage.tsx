import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { v4 as uuidv4 } from 'uuid';
import { socket } from "~/config/socket/socket";

export default function Home() {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState<string>("");
    
   

    const handleJoin = () =>{
        const roomId = uuidv4();
        navigate(`/game/${roomId}`);
    }

    const handleJoinId = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        if(!roomId) return;
        navigate(`/game/${roomId}`);
    };

    return (
        <main className=" flex min-h-screen items-center justify-center bg-gray-900">

            {/* {!username && 
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
                        type="text"
                        placeholder="Coxinha123"
                        required
                        />
                    </div>
                    </div>
                </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                <Button type="submit" form="form" className="w-full" >
                    Jogar
                </Button>
                </CardFooter>
            </Card>
            }
            {username &&  */}
            <Card>
                <CardHeader>
                    <CardTitle>Entre em uma sala</CardTitle>
                    <CardDescription>
                        Crie uma sala ou entre em uma com um id
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">

                    <form className="flex flex-col gap-2 w-full" onSubmit={handleJoinId}>
                        <Input placeholder="ID da sala" name="roomId" required onChange={(e) => setRoomId(e.target.value)} />
                        <Button className="w-full" type="submit">
                            Entrar
                        </Button>
                    </form>

                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-gray-700"></div>
                        <span className="flex-shrink mx-4 text-gray-400 text-xs">ou</span>
                        <div className="flex-grow border-t border-gray-700"></div>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <Button 
                            type="button" 
                            variant="outline" 
                            className="w-full" 
                            onClick={handleJoin}
                        >
                            Crie uma sala
                        </Button>
                    </div>
                </CardContent>
              
            </Card>
            {/* }  */}

        </main>
  )
}