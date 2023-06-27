from kivy.app import App
from kivy.uix.widget import Widget
from kivy.properties import StringProperty,NumericProperty, ObjectProperty
from kivy.core.audio.audio_sdl2 import SoundLoader
from kivy.graphics.context_instructions import Color
from kivy.graphics.vertex_instructions import Line,Triangle
from kivy.clock import Clock
from kivy.core.window import Window
from kivy import platform
from random import randint
from kivy.graphics.vertex_instructions import Quad
from kivy.uix.relativelayout import RelativeLayout
from kivy.lang.builder import Builder

Builder.load_file("menu.kv")

class MainWidget(RelativeLayout):
    from transforms import transform,transform_2D,transform_perspective
    from user_actions import on_keyboard_down,on_keyboard_up,on_touch_down,on_touch_up,keyboard_closed
    
    menu_widget=ObjectProperty()
    menu_title=StringProperty()
    button_title=StringProperty()
    score=NumericProperty()
    bg=StringProperty()
    k=1 # helper for bckground
    difficulty=StringProperty()
    ind=0 #helper for difficulty 
    h_score=StringProperty()

    perspective_point_x = NumericProperty(0)
    perspective_point_y = NumericProperty(0)
    
    vertical_lines = []
    v_lines = 10
    v_line_dist = 0.2  # in % of total width
    
    horizontal_lines = []
    h_lines = 10
    h_line_dist = 0.2  # in % of total width
    SPEED=0.005
    x=0.01

    SPEED_x=0.03
    current_speed_x=0
    current_offset_x=0

    current_offset_y=0
    current_loop_y=0

    no_tiles=8
    tiles=[]
    tile_coordinates=[]

    sound_begin=None
    sound_music1=None
    sound_gameover_impact=None
    sound_gameover_voice=None
    sound_restart=None

    ship=None
    ship_width=0.1
    ship_height=0.035
    ship_base_y=0.04
    ship_coordinates=[(0,0),(0,0),(0,0)]

    game_over=False
    game_started=False

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # ye ek baar chalega hence ek baar 7 lines ban jayengi baar baar nahi banegi
        self.menu_title="G   a   l   a   x   y"
        self.button_title="start"
        self.init_vertical_lines()
        self.init_horizontal_lines()
        self.init_tiles()
        self.init_ship()
        self.start_tiles()
        self.init_audio()
        self.generate_tile_coordinates()
        self.difficulty="Easy"
        self.bg=f"RESOURCES/images/bg1.jpg"
        self.score=0
        if self.is_desktop():
            self.keyboard = Window.request_keyboard(self.keyboard_closed,self)
            self.keyboard.bind(on_key_down=self.on_keyboard_down)
            self.keyboard.bind(on_key_up=self.on_keyboard_up)
        self.sound_galaxy.play()
        Clock.schedule_interval(self.update,1/60)
    
    def reset_game(self):
        self.current_speed_x=0
        self.current_offset_x=0
        self.current_offset_y=0
        self.current_loop_y=0
        self.tile_coordinates=[]
        self.score=0
        self.start_tiles()
        self.generate_tile_coordinates()
        self.game_over=False

    def is_desktop(self):
        if platform in ("linux","win","macosx"):
            return True
        else:
            return False

    def change_difficulty(self,obj):
        self.ind+=1
        self.ind=self.ind%3
        lst=["Easy","Medium","Hard"]
        self.difficulty=lst[self.ind]
        if(self.ind==0):
            self.x=0.01
        if(self.ind==1):
            self.x=0.015
        if(self.ind==2):
            self.x=0.02
        print(self.SPEED)
        print(self.x)

    def init_audio(self):
        self.sound_begin=SoundLoader.load("RESOURCES/audio/begin.wav")
        self.sound_galaxy=SoundLoader.load("RESOURCES/audio/galaxy.wav")
        self.sound_gameover_impact=SoundLoader.load("RESOURCES/audio/gameover_impact.wav")
        self.sound_gameover_voice=SoundLoader.load("RESOURCES/audio/gameover_voice.wav")
        self.sound_music1=SoundLoader.load("RESOURCES/audio/music1.wav")
        self.sound_restart=SoundLoader.load("RESOURCES/audio/restart.wav")
        self.sound_begin.volume=0.25
        self.sound_music1.volume=1
        self.sound_gameover_impact.volume=0.6
        self.sound_gameover_voice.volume=0.25
        self.sound_restart.volume=0.25

    def start(self,obj):
        self.sound_begin.play()
        self.sound_music1.play()
        self.game_started=True
        self.menu_widget.opacity=0
        self.reset_game()

    def init_vertical_lines(self):
        with self.canvas:
            Color(1, 1, 1)
            for i in range(self.v_lines):
                self.vertical_lines.append(Line())
            # self.line=Line(points=[100,0,100,100])

    def init_tiles(self):
        with self.canvas:
            Color(1, 1, 1)
            for i in range(self.no_tiles):
                self.tiles.append(Quad())

    def generate_tile_coordinates(self):
        last_y=0
        last_x=0
        for i in range(len(self.tile_coordinates)-1,-1,-1):
            if(self.tile_coordinates[i][1]<self.current_loop_y):
                del self.tile_coordinates[i]

        if(len(self.tile_coordinates)>0):
            last_coordinate=self.tile_coordinates[-1]
            last_x=last_coordinate[0]
            last_y=last_coordinate[1]+1
        for i in range(len(self.tile_coordinates),self.no_tiles):
            n=self.v_lines/2
            x=randint(0,4)
            # 0 --> straight
            # 1,2 --> right
            # 3,4 --> left
            if(last_x<=-n+1):
                x=randint(0,2)
            if(last_x>=n-1):
                r=randint(0,2)
                l=[0,3,4]
                x=l[r]
            self.tile_coordinates.append((last_x,last_y))
            if(x==1 or x==2):
                last_x+=1
                self.tile_coordinates.append((last_x,last_y))
                last_y+=1
                self.tile_coordinates.append((last_x,last_y))
            if(x==3 or x==4):
                last_x-=1
                self.tile_coordinates.append((last_x,last_y))
                last_y+=1
                self.tile_coordinates.append((last_x,last_y))
            last_y+=1

    def change_background(self,obj):
        self.k+=1
        self.k=(self.k%6)
        if(self.k!=0):
            self.bg=f"RESOURCES/images/bg{self.k}.jpg"

    def update_tiles(self):
        for i in range(0,self.no_tiles):
            tile=self.tiles[i]
            tile_coordinates=self.tile_coordinates[i]
            xmin,ymin=self.get_tile_coordinate(tile_coordinates[0],tile_coordinates[1])
            xmax,ymax=self.get_tile_coordinate(tile_coordinates[0]+1,tile_coordinates[1]+1)
            x1,y1=self.transform(xmin,ymin)#2   3
            x2,y2=self.transform(xmin,ymax)
            x3,y3=self.transform(xmax,ymax)
            x4,y4=self.transform(xmax,ymin)#1   4 like this
            tile.points=[x1,y1,x2,y2,x3,y3,x4,y4]

    def start_tiles(self):
        for i in range(0,self.no_tiles):
            self.tile_coordinates.append((0,i))

    def init_ship(self):
        with self.canvas:
            Color(0,0,0)
            self.ship=Triangle()

    def update_ship(self):
        x1=self.width/2-self.width*self.ship_width/2
        x2=self.width/2
        x3=self.width/2+self.width*self.ship_width/2
        y1=y3=self.ship_base_y*self.height
        y2=self.ship_base_y*self.height+self.ship_height*self.height
        self.ship_coordinates[0]=(x1,y1)
        self.ship_coordinates[1]=(x2,y2)
        self.ship_coordinates[2]=(x3,y3)
        x1,y1=self.transform(*self.ship_coordinates[0])
        x2,y2=self.transform(*self.ship_coordinates[1])
        x3,y3=self.transform(*self.ship_coordinates[2])
        self.ship.points=[x1,y1,x2,y2,x3,y3]

    def st_collision(self):
        for i in range(0,len(self.tile_coordinates)):
            t_x,t_y=self.tile_coordinates[i]
            if t_y>self.current_loop_y+1:
                return False
            if(self.ship_tile_collision(t_x,t_y)):
                return True
        else:
            return False

    def ship_tile_collision(self,t_x,t_y):
        xmin,ymin=self.get_tile_coordinate(t_x,t_y)
        xmax,ymax=self.get_tile_coordinate(t_x+1,t_y+1)
        for i in range(0,3):
            x,y=self.ship_coordinates[i]
            if(xmin<=x<=xmax and ymin<=y<=ymax):
                return True
        else:
            return False

    def get_line_x_from_index(self,index):
        central_line=self.perspective_point_x
        spacing=self.v_line_dist*self.width
        offset=index-0.5
        line_x=central_line+offset*spacing+self.current_offset_x
        return line_x
    
    def get_line_y_from_index(self,index):
        initial_line=0
        spacing=self.h_line_dist*self.height
        offset=index
        line_y=initial_line+offset*spacing-self.current_offset_y
        return line_y

    def get_tile_coordinate(self,t_x,t_y):
        t_y-=self.current_loop_y
        x=self.get_line_x_from_index(t_x)
        y=self.get_line_y_from_index(t_y)
        return x,y
    
    def update_vertical_lines(self):
        self.start_index=int(-self.h_lines/2)+1
        for i in range(self.start_index,self.start_index+self.v_lines):
            x = self.get_line_x_from_index(i)
            x1, y1 = self.transform(x, 0)
            x2, y2 = self.transform(x, self.height)
            self.vertical_lines[i].points = [x1, y1, x2, y2]
        
    def init_horizontal_lines(self):
        with self.canvas:
            Color(1, 1, 1)
            for i in range(self.h_lines):
                self.horizontal_lines.append(Line())

    def update_horizontal_lines(self):
        xmin=self.get_line_x_from_index(self.start_index)
        xmax=self.get_line_x_from_index(self.start_index+self.v_lines-1)
        for i in range(self.h_lines):
            y=self.get_line_y_from_index(i)
            x1, y1 = self.transform(xmin, y)
            x2, y2 = self.transform(xmax, y)
            self.horizontal_lines[i].points = [x1, y1, x2, y2]

    def update(self,dt):
        self.update_vertical_lines()
        self.update_horizontal_lines()
        self.update_tiles()
        self.update_ship()
        time_factor=dt*60
        if not self.game_over and self.game_started:
            self.current_offset_y+=self.SPEED*self.height*time_factor
            # kyunki kabhi kabhi k ki jagah 1.5 sec main function wapas chalta hai ya phir 0.5 sec main to uske liye maintain   karne ke liye
            spacing_y = self.v_line_dist * self.height
            while self.current_offset_y >= spacing_y:
                self.score+=1
                self.SPEED+=0.0001
                self.current_offset_y -= spacing_y
                self.current_loop_y+=1
                self.generate_tile_coordinates()
            self.current_offset_x+=self.current_speed_x*self.width*time_factor
        if not self.st_collision() and not self.game_over:
            self.game_over=True
            self.menu_widget.opacity=1
            self.menu_title="Game Over"
            self.button_title="Restart"
            self.sound_music1.stop()
            self.sound_gameover_impact.play()
            Clock.schedule_once(self.play_sound_gameover_voice,1)
            Clock.schedule_once(self.play_sound_restart,2)
    def play_sound_gameover_voice(self,obj):
        self.sound_gameover_voice.play()
    def play_sound_restart(self,obj):
        self.sound_restart.play()

class GalaxyApp(App):
    pass


GalaxyApp().run()
